import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface FilterCriteriaType extends Record<string, string | number | boolean> {
	search: string;
}

type SetCriteriaType = (nextCriteria: Partial<FilterCriteriaType>) => void;

/**
 * A custom React hook for managing and synchronizing filter criteria with URL search parameters.
 *
 * This hook helps maintain a search value in the URL query string, making it easy to persist and update search filters
 * across navigation. It provides the current filter criteria and a setter function to update the criteria.
 *
 * @function
 * @returns {[FilterCriteriaType, SetCriteriaType]} - Returns an array with the current filter criteria object and a function to update the criteria.
 *
 * @typedef {Object} FilterCriteriaType - An object representing the filter criteria.
 * @property {string} search - The search query string used for filtering results.
 *
 * @typedef {Function} SetCriteriaType - A function to update the filter criteria.
 *
 * @example
 * // Using the hook in a component:
 * const [criteria, setCriteria] = useCriteria();
 *
 * // Accessing the current search value:
 * console.log(criteria.search); // Outputs the current search query from the URL.
 *
 * // Updating the search value:
 * setCriteria({ search: 'React' });
 * // This updates the URL to include 'search=React' in the query string.
 *
 * @example
 * // Resetting the search value:
 * setCriteria({ search: '' });
 * // This removes the 'search' query parameter from the URL.
 *
 * @example
 * // Default usage:
 * const [criteria] = useCriteria();
 * console.log(criteria); // Outputs: { search: '' } if no search parameter is present in the URL.
 */

export const useCriteria = (): [FilterCriteriaType, SetCriteriaType] => {
	const location = useLocation();
	const navigate = useNavigate();

	const criteria: FilterCriteriaType = useMemo(() => {
		const searchParams = new URLSearchParams(location.search);

		const search = searchParams.get('search') || '';

		return {
			search,
		};
	}, [location.search]);

	const setCriteria: SetCriteriaType = useCallback(
		({ search }) => {
			const nextSearchParams = new URLSearchParams(location.search);

			if (search !== undefined) {
				search?.trim() ? nextSearchParams.set('search', search) : nextSearchParams.delete('search');
			}

			navigate({ ...location, search: nextSearchParams.toString() });
		},
		[location.search, location.hash]
	);

	return [criteria, setCriteria];
};

export default useCriteria;
