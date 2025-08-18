import React from 'react';
import PostItem from '../../components/PostItem';

const ListLayout = ({ posts, ...props }) => (
    <div className="recent-posts-showcase list">
        {posts.map((post) => (
            <PostItem key={post.id} post={post} {...props} />
        ))}
    </div>
);

export default ListLayout;
