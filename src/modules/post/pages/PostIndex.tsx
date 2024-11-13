import { useMemo, useState } from 'react';
import TableHeader, { ITableCell } from 'src/components/shared/table/TableHeader';
import useCriteria from 'src/hooks/useCriteria';
import { useDebounce } from 'src/hooks/useDebounce';
import TableRow from 'src/modules/post/components/table/TableRow';
import { useGetAllPostsQuery } from 'src/services/posts/useGetAllPostsQuery';
import { postStore } from '../store/postStore';

const PostIndex = () => {
	const { search, sortKey, sortOrder, setSortOrder, setSortKey } = postStore();

	const [criteria, setCriteria] = useCriteria();
	const [searchValue, setSearchValue] = useState(criteria.search);

	// Debounced function to update the search criteria
	const updateSearchCriteria = useDebounce((value: string) => {
		setCriteria({
			...criteria,
			search: value,
		});
	}, 500);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchValue(value);
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
		const filtered = search ? posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())) : posts;

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
	}, [posts, search, sortKey, sortOrder]);

	return (
		<div className='bg-[#1c252e] w-full  my-6 rounded-2xl pb-3 '>
			<input
				className='rounded-t-2xl w-full py-3 px-4 outline-none bg-[#1c252e] border-b-[1px] border-b-slate-500 text-slate-100 '
				type='text'
				name=''
				id=''
				placeholder='Search By Title'
				value={searchValue}
				onChange={handleSearchChange}
			/>

			<div className='mt-3 overflow-x-scroll'>
				<table className='w-full'>
					<TableHeader
						cells={postsTableHeaderCells}
						sortKey={sortKey}
						sortOrder={sortOrder}
						onSort={handleSortChange}
					/>
					<tbody>
						{filteredAndSortedPosts?.map((post, index) => (
							<TableRow post={post} key={index} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PostIndex;

const postsTableHeaderCells: ITableCell[] = [
	{ title: 'ID', key: 'id' },
	{ title: 'Title', key: 'title', minWidth: 'min-w-52' },
	{ title: 'Description', key: 'body', minWidth: 'min-w-52' },
	{ title: 'Action', key: 'action', sortable: false },
];
