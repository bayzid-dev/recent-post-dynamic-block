
import { useSelect } from '@wordpress/data';
import { TAXONOMY_PARAM_MAP } from '../constants/taxonomies';

export const usePosts = (postType, postsToShow, taxonomy, terms) => {
    return useSelect((select) => {
        if (!postType) return [];
        const query = {
            per_page: postsToShow,
            _embed: true,
        };

        if (taxonomy && terms?.length) {
            const param = TAXONOMY_PARAM_MAP[taxonomy] || taxonomy;
            query[param] = terms;
        }

        return select('core').getEntityRecords('postType', postType, query);
    }, [postType, postsToShow, taxonomy, terms]);
};
