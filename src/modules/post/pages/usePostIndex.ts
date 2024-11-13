import { useMemo, useState } from 'react';
import useCriteria from 'src/hooks/useCriteria';
import { useDebounce } from 'src/hooks/useDebounce';
import { useGetAllPostsQuery } from 'src/services/posts/useGetAllPostsQuery';
import { postStore } from '../store/postStore';

const usePostIndex = () => {
	const { sortKey, sortOrder, setSortOrder, setSortKey } = postStore();

	const [criteria, setCriteria] = useCriteria();
	const [searchValue, setSearchValue] = useState(criteria.search);

	const updateSearchCriteria = useDebounce((value: string) => {
		setSearchValue(value);
	}, 500);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setCriteria({
			...criteria,
			search: value,
		});

		updateSearchCriteria(value);
	};

	const { data: posts } = useGetAllPostsQuery();

	const handleSortChange = (key: string) => {
		if (sortKey === key) {
			// Toggle sort order if the same key is clicked
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			// Set new sort key and reset order to 'asc'
			setSortKey(key);
			setSortOrder('asc');
		}
	};

	const filteredAndSortedPosts = useMemo(() => {
		if (!posts) return [];

		// Filter by search
		const filtered = searchValue
			? posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
			: posts;

		// Sort by the selected key
		const sorted = [...filtered].sort((a, b) => {
			const valueA = a[sortKey as keyof typeof a];
			const valueB = b[sortKey as keyof typeof b];

			if (typeof valueA === 'string' && typeof valueB === 'string') {
				return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
			}

			if (typeof valueA === 'number' && typeof valueB === 'number') {
				return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
			}

			return 0;
		});

		return sorted;
	}, [posts, searchValue, sortKey, sortOrder]);

	return {
		filteredAndSortedPosts,
		handleSortChange,
		handleSearchChange,
		searchValue: criteria.search,
	};
};

export default usePostIndex;
