import React from 'react';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DisplaySettingsPanel = ({ displayImage, displayExcerpt, displayAuthor, displayDate, enableLoadMore, setAttributes }) => (
    <>
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
    </>
);

export default DisplaySettingsPanel;
