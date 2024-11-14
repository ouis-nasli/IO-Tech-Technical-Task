import { useQuery, UseQueryOptions } from 'react-query';
import { _axios } from '../httpConfig';
import { IPost } from './interface';
import { HttpError } from 'src/interfaces/common';
import queryClient from 'src/queryClient';
import { FilterCriteriaType } from 'src/hooks/useCriteria';

const postsKey = 'posts';

export const useGetAllPostsQuery = (
	_criteriaSearchParams?: Partial<FilterCriteriaType>,
	options?: UseQueryOptions<IPost[], HttpError>
) => {
	// For the filter,
	// const searchParams = objToSearchParamsString(criteriaSearchParams);
	const key = [postsKey];

	return useQuery<IPost[], HttpError>(key, () => _axios.get<IPost[]>(`/posts`).then((data) => data.data), options);
};

export function invalidatePostsQuery() {
	queryClient.invalidateQueries({ queryKey: [postsKey] });
}
