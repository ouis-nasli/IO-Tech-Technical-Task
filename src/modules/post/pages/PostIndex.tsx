import { useMemo, useState } from 'react';
import TableHeader from 'src/components/shared/table/TableHeader';
import useCriteria from 'src/hooks/useCriteria';
import { useDebounce } from 'src/hooks/useDebounce';
import TableRow from 'src/modules/post/components/table/TableRow';
import { useGetAllPostsQuery } from 'src/services/posts/useGetAllPostsQuery';

const PostIndex = () => {
	const [criteria, setCriteria] = useCriteria();
	const [searchValue, setSearchValue] = useState(criteria.search);

	// Debounced function to update the search criteria
	const updateSearchCriteria = useDebounce((value: string) => {
		setCriteria({
			...criteria,
			search: value,
		});
	}, 500);

	// Handle input change
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchValue(value);
		updateSearchCriteria(value);
	};

	const { data: posts } = useGetAllPostsQuery();

	const filteredPosts = useMemo(() => {
		if (!searchValue.trim()) return posts;

		// Case-insensitive search by title
		const searchLower = searchValue.toLowerCase();
		return posts?.filter((post) => post.title.toLowerCase().includes(searchLower));
	}, [posts, criteria.search]);

	return (
		<div className='bg-[#1c252e] w-full  mt-6 rounded-2xl pb-3'>
			<input
				className='rounded-t-2xl w-full py-3 px-4 outline-none bg-[#1c252e] border-b-[1px] border-b-slate-500 text-slate-100 '
				type='text'
				name=''
				id=''
				placeholder='Search By Title'
				value={searchValue}
				onChange={handleSearchChange}
			/>

			<div className='mt-3'>
				<table className='w-full'>
					<TableHeader cells={postsTableHeaderCells} />
					<tbody>
						{filteredPosts?.map((post, index) => (
							<TableRow post={post} key={index} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PostIndex;

const postsTableHeaderCells = [
	{
		title: 'ID',
	},
	{
		title: 'Title',
	},
	{
		title: 'Description',
	},
	{
		title: 'Action',
	},
];
