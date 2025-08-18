<?php
/**
 * Recent Posts Showcase Block Render Function
 *
 * @package recent-posts-showcase
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>
<div <?php echo wp_kses_post( get_block_wrapper_attributes() ); ?>>
	<?php
	/**
	 * Server-side rendering for the Recent Posts Showcase block
	 *
	 * @param array $attributes Block attributes.
	 * @return string Block HTML.
	 */

	// Set default attributes.
	$rps_post_type = isset( $attributes['postType'] ) ? $attributes['postType'] : 'post';
	$posts_to_show = isset( $attributes['postsToShow'] ) ? intval( $attributes['postsToShow'] ) : 6;
	$rps_taxonomy  = ! empty( $attributes['taxonomy'] ) ? sanitize_text_field( $attributes['taxonomy'] ) : '';
	$terms         = ! empty( $attributes['terms'] ) ? array_map( 'intval', $attributes['terms'] ) : array();

	$display_image   = ! empty( $attributes['displayImage'] );
	$display_excerpt = ! empty( $attributes['displayExcerpt'] );
	$display_author  = ! empty( $attributes['displayAuthor'] );
	$display_date    = ! empty( $attributes['displayDate'] );
	$layout          = isset( $attributes['layout'] ) ? $attributes['layout'] : 'grid';

	// Post type arguments.
	$args = array(
		'post_type'      => $rps_post_type,
		'posts_per_page' => $posts_to_show,
		'post_status'    => 'publish',
	);

	// Add taxonomy query if taxonomy and terms are provided.
	if ( $rps_taxonomy && ! empty( $terms ) ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => $rps_taxonomy,
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
		echo '<div ' . wp_kses_post( get_block_wrapper_attributes( array( 'class' => 'recent-posts-showcase ' . $layout_class ) ) ) . '>';

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
				echo '<div class="recent-post-excerpt">' . esc_html( get_the_excerpt() ) . '</div>';
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
	if ( 'carousel' !== $layout && $enable_load_more ) {
		$selected_taxonomy = $attributes['taxonomy'] ?? '';
		$selected_terms    = isset( $attributes['terms'] ) ? implode( ',', $attributes['terms'] ) : '';
		echo '<div class="rps-load-more-wrapper"
            data-current-page="1"
            data-post-type="' . esc_attr( $rps_post_type ) . '"
            data-posts-per-page="' . esc_attr( $posts_to_show ) . '"
            data-display-image="' . ( ! empty( $attributes['displayImage'] ) ? 'true' : 'false' ) . '"
            data-display-excerpt="' . ( ! empty( $attributes['displayExcerpt'] ) ? 'true' : 'false' ) . '"
            data-display-author="' . ( ! empty( $attributes['displayAuthor'] ) ? 'true' : 'false' ) . '"
            data-display-date="' . ( ! empty( $attributes['displayDate'] ) ? 'true' : 'false' ) . '"
            data-taxonomy="' . esc_attr( $selected_taxonomy ) . '" 
            data-terms="' . esc_attr( $selected_terms ) . '"
            data-layout="' . esc_attr( $layout ) . '">';
			echo '<button class="rps-load-more-button">' . esc_html__( 'Load More', 'recent-posts-showcase' ) . '</button>';
		echo '</div>';
	}
	echo '</div>'; // close post list container.
	?>
	</div>
<?php
