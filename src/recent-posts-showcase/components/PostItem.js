import React from 'react';
import PostMeta from './PostMeta';

const PostItem = ({ post, displayImage, displayAuthor, displayDate, displayExcerpt }) => {
    return (
        <div className="recent-post-item">
            {displayImage && post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <img
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered}
                />
            )}
            <div className="rps-content-wrapper">
                <h3 className="recent-post-title">
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                        {post.title.rendered}
                    </a>
                </h3>
                <PostMeta
                    author={post._embedded?.author?.[0]?.name}
                    date={post.date}
                    displayAuthor={displayAuthor}
                    displayDate={displayDate}
                />
                {displayExcerpt && (
                    <div
                        className="recent-post-excerpt"
                        dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
                    />
                )}
            </div>
        </div>
    );
};

export default PostItem;
