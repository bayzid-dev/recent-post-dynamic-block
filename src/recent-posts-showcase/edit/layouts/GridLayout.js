import React from 'react';
import PostItem from '../../components/PostItem';

const GridLayout = ({ posts, ...props }) => (
    <div className="recent-posts-showcase grid">
        {posts.map((post) => (
            <PostItem key={post.id} post={post} {...props} />
        ))}
    </div>
);

export default GridLayout;
