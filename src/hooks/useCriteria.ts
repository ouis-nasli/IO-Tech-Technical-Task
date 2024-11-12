import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface FilterCriteriaType extends Record<string, string | number | boolean> {
	search: string;
}

type SetCriteriaType = (nextCriteria: Partial<FilterCriteriaType>) => void;

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
