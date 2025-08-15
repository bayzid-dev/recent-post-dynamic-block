<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php
	/**
	 * Server-side rendering for the Recent Posts Showcase block
	 *
	 * @param array $attributes Block attributes.
	 * @return string Block HTML.
	 */

	// Set default attributes.
	$post_type     = isset( $attributes['postType'] ) ? $attributes['postType'] : 'post';
	$posts_to_show = isset( $attributes['postsToShow'] ) ? intval( $attributes['postsToShow'] ) : 5;
	$taxonomy      = ! empty( $attributes['taxonomy'] ) ? sanitize_text_field( $attributes['taxonomy'] ) : '';
	$terms         = ! empty( $attributes['terms'] ) ? array_map( 'intval', $attributes['terms'] ) : array();

	$display_image   = ! empty( $attributes['displayImage'] );
	$display_excerpt = ! empty( $attributes['displayExcerpt'] );
	$display_author  = ! empty( $attributes['displayAuthor'] );
	$display_date    = ! empty( $attributes['displayDate'] );
	$layout          = isset( $attributes['layout'] ) ? $attributes['layout'] : 'grid';

	// Post type arguments.
	$args = array(
		'post_type'      => $post_type,
		'posts_per_page' => $posts_to_show,
		'post_status'    => 'publish',
	);

	// Add taxonomy query if taxonomy and terms are provided.
	if ( $taxonomy && ! empty( $terms ) ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => $taxonomy,
				'field'    => 'term_id',
				'terms'    => $terms,
			),
		);
	}

	$query = new WP_Query( $args );

	// Start output buffer.
	if ( $query->have_posts() ) {
		$layout_class = match ( $layout ) {
			'grid' => 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
			'list' => 'list flex flex-col gap-6',
			'carousel' => 'swiper-wrapper',
			default => '',
		};

		echo 'carousel' === $layout ? '<div class="swiper-container">' : '';
		$post_item = 'carousel' === $layout ? 'swiper-slide' : '';
		echo '<div ' . get_block_wrapper_attributes( array( 'class' => 'recent-posts-showcase ' . $layout_class ) ) . '>';

		while ( $query->have_posts() ) {
			$query->the_post();

			echo '<div class="recent-post-item ' . esc_attr( $post_item ) . '">';
			echo '<div class="rps-thumbnail-wrapper">';
			if ( $display_image && has_post_thumbnail() ) {
				echo '<div class="recent-post-thumbnail">';
				the_post_thumbnail( 'medium' );
				echo '</div>';
			}
			echo '</div>';

			echo '<div class="rps-content-wrapper">';
			echo '<h3 class="recent-post-title"><a href="' . esc_url( get_permalink() ) . '">' . get_the_title() . '</a></h3>';

			if ( $display_author || $display_date ) {
				echo '<div class="recent-post-meta">';
				if ( $display_author ) {
					echo '<span class="post-author">' . esc_html( get_the_author() ) . '</span> ';
				}
				if ( $display_date ) {
					echo ' <span class="post-date">' . esc_html( get_the_date() ) . '</span>';
				}
				echo '</div>';
			}

			if ( $display_excerpt ) {
				echo '<div class="recent-post-excerpt">' . get_the_excerpt() . '</div>';
			}
			echo '</div>';

			echo '</div>';
		}

		echo '</div>';
		if ( 'carousel' === $layout ) {
			?>
			<div class="rps-swiper-pagination">
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
			<div class="swiper-pagination"></div>
			</div> <!-- end swiper-container -->
			<?php
		}
		echo 'carousel' === $layout ? '</div>' : '';

		wp_reset_postdata();
	} else {
		echo '<p>' . esc_html__( 'No posts found.', 'recent-post-showcase' ) . '</p>';
	}


	$enable_load_more = isset( $attributes['enableLoadMore'] ) ? (bool) $attributes['enableLoadMore'] : false;
	if ( $enable_load_more ) {
		echo '<div class="rps-load-more-wrapper" data-current-page="1" data-post-type="' . esc_attr( $post_type ) . '" data-posts-per-page="' . esc_attr( $posts_to_show ) . '">';
		echo '<button class="rps-load-more-button">' . esc_html__( 'Load More', 'recent-posts-showcase' ) . '</button>';
		echo '</div>';
	}

	echo '</div>'; // close post list container.



	// Enqueue JS only once (not inside render).
	add_action(
		'wp_footer',
		function () {
			$rest_url = esc_url_raw(
				rest_url( 'recent-posts-showcase/v1/load-more' )
			);
			?>
		<script>
			document.addEventListener('DOMContentLoaded', () => {
				const wrapper = document.querySelector('.rps-load-more-wrapper');
				if (!wrapper) return;

				const btn = wrapper.querySelector('.rps-load-more-button');
				const container = document.querySelector('.recent-posts-showcase');
						const restUrl = '<?php echo $rest_url; ?>';

				btn.addEventListener('click', async () => {
					let page = parseInt(wrapper.dataset.currentPage) + 1;
					const postType = wrapper.dataset.postType;
					const postsPerPage = wrapper.dataset.postsPerPage;

					btn.textContent = 'Loading...';

					const res = await fetch(
						`${restUrl}?post_type=${postType}&page=${page}&posts_per_page=${postsPerPage}`
					);

					if (!res.ok) {
						console.error('Request failed:', res.status, await res.text());
						btn.textContent = 'Error';
						return;
					}

					const data = await res.json();

					if (data.html) {
						container.insertAdjacentHTML('beforeend', data.html);
						wrapper.dataset.currentPage = page;
						btn.textContent = 'Load More';
					}

					if (!data.hasMore) {
						btn.remove();
					}
				});
			});
		</script>
			<?php
		},
		100
	);
	?>
	</p>
<?php
