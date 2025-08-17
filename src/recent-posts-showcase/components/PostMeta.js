import React from 'react';
import { formatDate } from '../constants/formatDate';

const PostMeta = ({ author, date, displayAuthor, displayDate }) => {
    if (!displayAuthor && !displayDate) return null;

    return (
        <div className="recent-post-meta">
            {displayAuthor && author && <span className="post-author">{author} </span>}
            {displayDate && date && <span className="post-date">{formatDate(date)}</span>}
        </div>
    );
};

export default PostMeta;
