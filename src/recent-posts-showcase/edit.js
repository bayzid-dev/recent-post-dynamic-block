import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { useSelect } from '@wordpress/data';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Edit = (props) => {
    const { attributes, setAttributes, name } = props;

    const {
        postType,
        postsToShow,
        displayImage,
        displayExcerpt,
        displayAuthor,
        displayDate,
        layout,
        enableLoadMore
    } = attributes;

    // Optional: Get available post types from the WordPress store
    const postTypes = useSelect((select) =>
        select('core').getPostTypes({ per_page: -1 }) || []
    );

    const postTypeOptions = postTypes
        .filter((type) => type.viewable)
        .map((type) => ({
            label: type.labels.singular_name,
            value: type.slug,
        }));

    const posts = useSelect((select) => {
        return select('core').getEntityRecords('postType', postType, {
            per_page: postsToShow,
            _embed: true,
        });
    }, [postType, postsToShow]);

    return (
        <div {...useBlockProps()}>

            <InspectorControls>
                <PanelBody title={__('Post Settings', 'recent-posts-showcase')} initialOpen={true}>
                    <SelectControl
                        label={__('Post Type', 'recent-posts-showcase')}
                        value={postType}
                        options={postTypeOptions}
                        onChange={(value) => setAttributes({ postType: value })}
                    />

                    <RangeControl
                        label={__('Number of Posts', 'recent-posts-showcase')}
                        value={postsToShow}
                        onChange={(value) => setAttributes({ postsToShow: value })}
                        min={1}
                        max={20}
                    />

                    <SelectControl
                        label={__('Layout', 'recent-posts-showcase')}
                        value={layout}
                        options={[
                            { label: 'Grid', value: 'grid' },
                            { label: 'List', value: 'list' },
                            { label: 'Carousel', value: 'carousel' },
                        ]}
                        onChange={(value) => setAttributes({ layout: value })}
                    />

                    <ToggleControl
                        label={__('Show Featured Image', 'recent-posts-showcase')}
                        checked={displayImage}
                        onChange={() => setAttributes({ displayImage: !displayImage })}
                    />
                    <ToggleControl
                        label={__('Show Excerpt', 'recent-posts-showcase')}
                        checked={displayExcerpt}
                        onChange={() => setAttributes({ displayExcerpt: !displayExcerpt })}
                    />
                    <ToggleControl
                        label={__('Show Author', 'recent-posts-showcase')}
                        checked={displayAuthor}
                        onChange={() => setAttributes({ displayAuthor: !displayAuthor })}
                    />
                    <ToggleControl
                        label={__('Show Date', 'recent-posts-showcase')}
                        checked={displayDate}
                        onChange={() => setAttributes({ displayDate: !displayDate })}
                    />
                    <ToggleControl
                        label={__('Enable Load More', 'recent-posts-showcase')}
                        checked={enableLoadMore}
                        onChange={() => setAttributes({ enableLoadMore: !enableLoadMore })}
                    />
                </PanelBody>
            </InspectorControls>

            {!posts ? (
                <p>{__('Loading...', 'recent-posts-showcase')}</p>
            ) : posts.length === 0 ? (
                <p>{__('No posts found.', 'recent-posts-showcase')}</p>
            ) : (
                <>
                    {layout === 'grid' && (
                        <div className="recent-posts-showcase grid">
                            {posts.map((post) => (
                                <div key={post.id} className="recent-post-item">

                                    {displayImage && post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                        <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} />
                                    )}

                                    <div className="rps-content-wrapper">
                                        <h3 className="recent-post-title">
                                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                                                {post.title.rendered}
                                            </a>
                                        </h3>

                                        {(displayAuthor || displayDate) && (
                                            <div className="recent-post-meta">
                                                {displayAuthor && (
                                                    <span className="post-author">
                                                        {post._embedded?.author?.[0]?.name + ' '}
                                                    </span>
                                                )}
                                                {displayDate && (
                                                    <span className="post-date">
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {displayExcerpt && (
                                            <div
                                                className="recent-post-excerpt"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === 'list' && (
                        <div className='recent-posts-showcase list'>
                            {posts.map((post) => (
                                <div key={post.id} className="recent-post-item">
                                    <div className="rps-thumbnail-wrapper">
                                        {displayImage && post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                            <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} />
                                        )}
                                    </div>

                                    <div className="rps-content-wrapper">
                                        <h3 className="recent-post-title">
                                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                                                {post.title.rendered}
                                            </a>
                                        </h3>

                                        {(displayAuthor || displayDate) && (
                                            <div className="recent-post-meta">
                                                {displayAuthor && (
                                                    <span className="post-author">
                                                        {post._embedded?.author?.[0]?.name + ' '}
                                                    </span>
                                                )}
                                                {displayDate && (
                                                    <span className="post-date">
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {displayExcerpt && (
                                            <div
                                                className="recent-post-excerpt"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === 'carousel' && (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={10}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            className="recent-posts-showcase"
                        >
                            {posts.map((post) => (
                                <SwiperSlide key={post.id} className="recent-post-item">
                                    {displayImage && post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                        <div className="rps-thumbnail-wrapper">
                                            <div className="recent-post-thumbnail">
                                                <img
                                                    src={post._embedded['wp:featuredmedia'][0].source_url}
                                                    alt={post.title.rendered}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="rps-content-wrapper">
                                        <h3 className="recent-post-title">
                                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                                                {post.title.rendered}
                                            </a>
                                        </h3>

                                        {(displayAuthor || displayDate) && (
                                            <div className="recent-post-meta">
                                                {displayAuthor && (
                                                    <span className="post-author">
                                                        {post._embedded?.author?.[0]?.name + ' '}
                                                    </span>
                                                )}
                                                {displayDate && (
                                                    <span className="post-date">
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {displayExcerpt && (
                                            <div
                                                className="recent-post-excerpt"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
                                            />
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </>
            )}
        </div>
    );
};

export default Edit;
