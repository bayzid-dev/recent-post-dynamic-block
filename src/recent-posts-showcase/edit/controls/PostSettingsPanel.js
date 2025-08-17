import React from 'react';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { LAYOUT_OPTIONS } from '../../constants/layouts';

const PostSettingsPanel = ({ postType, postTypeOptions, setAttributes, postsToShow, layout }) => (
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
            options={LAYOUT_OPTIONS}
            onChange={(value) => setAttributes({ layout: value })}
        />
    </PanelBody>
);

export default PostSettingsPanel;
