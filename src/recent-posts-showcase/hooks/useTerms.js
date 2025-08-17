import { useSelect } from '@wordpress/data';

export const useTerms = (taxonomy) => {
    return useSelect((select) => {
        return taxonomy
            ? select('core').getEntityRecords('taxonomy', taxonomy, { per_page: -1 })
            : [];
    }, [taxonomy]);
};
