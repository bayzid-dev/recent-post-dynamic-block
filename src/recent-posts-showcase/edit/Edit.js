import React from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { usePostTypes } from '../hooks/usePostTypes';
import { useTerms } from '../hooks/useTerms';
import { usePosts } from '../hooks/usePosts';
import PostSettingsPanel from './controls/PostSettingsPanel';
import FilterSettingsPanel from './controls/FilterSettingsPanel';
import DisplaySettingsPanel from './controls/DisplaySettingsPanel';
import GridLayout from './layouts/GridLayout';
import ListLayout from './layouts/ListLayout';
import CarouselLayout from './layouts/CarouselLayout';
import './editor.scss'; // editor styles.

const Edit = ({ attributes, setAttributes }) => {
    const { postType, taxonomy, terms, postsToShow, displayImage, displayExcerpt, displayAuthor, displayDate, layout, enableLoadMore } = attributes;

    const postTypes = usePostTypes();
    const availableTerms = useTerms(taxonomy);
    const posts = usePosts(postType, postsToShow, taxonomy, terms);

    const termNames = availableTerms ? availableTerms.map((term) => term.name) : [];

    const updateTerms = (selectedNames) => {
        const selectedIds = availableTerms
            .filter((term) => selectedNames.includes(term.name))
            .map((term) => term.id);
        setAttributes({ terms: selectedIds });
    };

    const postTypeOptions = postTypes
        .filter((type) => type.viewable)
        .map((type) => ({
            label: type.labels.singular_name,
            value: type.slug,
        }));

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <div className="recent-posts-showcase-inspector">
                    <PostSettingsPanel
                        postType={postType}
                        postTypeOptions={postTypeOptions}
                        setAttributes={setAttributes}
                        postsToShow={postsToShow}
                        layout={layout}
                    />
                    <FilterSettingsPanel
                        taxonomy={taxonomy}
                        setAttributes={setAttributes}
                        availableTerms={availableTerms}
                        terms={terms}
                        updateTerms={updateTerms}
                        termNames={termNames}
                    />
                    <DisplaySettingsPanel
                        displayImage={displayImage}
                        displayExcerpt={displayExcerpt}
                        displayAuthor={displayAuthor}
                        displayDate={displayDate}
                        enableLoadMore={enableLoadMore}
                        setAttributes={setAttributes}
                    />
                </div>
            </InspectorControls>

            {!posts ? (
                <p>{__('Loading...', 'recent-posts-showcase')}</p>
            ) : posts.length === 0 ? (
                <p>{__('No posts found.', 'recent-posts-showcase')}</p>
            ) : layout === 'grid' ? (
                <GridLayout posts={posts} displayImage={displayImage} displayAuthor={displayAuthor} displayDate={displayDate} displayExcerpt={displayExcerpt} />
            ) : layout === 'list' ? (
                <ListLayout posts={posts} displayImage={displayImage} displayAuthor={displayAuthor} displayDate={displayDate} displayExcerpt={displayExcerpt} />
            ) : (
                <CarouselLayout posts={posts} displayImage={displayImage} displayAuthor={displayAuthor} displayDate={displayDate} displayExcerpt={displayExcerpt} />
            )}
        </div>
    );
};

export default Edit;
