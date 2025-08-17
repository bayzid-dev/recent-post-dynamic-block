import { useSelect } from '@wordpress/data';

export const usePostTypes = () => {
    return useSelect((select) =>
        select('core').getPostTypes({ per_page: -1 }) || []
    );
};
