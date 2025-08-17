import React from 'react';
import { PanelBody, SelectControl, FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { AVAILABLE_TAXONOMIES } from '../../constants/taxonomies';

const FilterSettingsPanel = ({ taxonomy, setAttributes, availableTerms, terms, updateTerms, termNames }) => (
    <PanelBody title={__('Filter Settings', 'recent-posts-showcase')}>
        <SelectControl
            label={__('Select Taxonomy', 'recent-posts-showcase')}
            value={taxonomy}
            options={AVAILABLE_TAXONOMIES}
            onChange={(value) => {
                setAttributes({ taxonomy: value, terms: [] });
            }}
        />
        {taxonomy && (
            <FormTokenField
                label={__('Select Terms', 'recent-posts-showcase')}
                value={
                    availableTerms
                        ? availableTerms.filter((term) => terms.includes(term.id)).map((term) => term.name)
                        : []
                }
                suggestions={termNames}
                onChange={updateTerms}
            />
        )}
    </PanelBody>
);

export default FilterSettingsPanel;
