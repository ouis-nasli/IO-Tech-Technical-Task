import TableHeader, { ITableCell } from 'src/components/shared/table/TableHeader';
import TableRow from 'src/modules/post/components/table/TableRow';
import usePostIndex from './usePostIndex';

const PostIndex = () => {
	const { filteredAndSortedPosts, handleSearchChange, handleSortChange, searchValue } = usePostIndex();

	return (
		<div className='bg-[#1c252e] w-full  my-6 rounded-2xl pb-3 '>
			<input
				className='rounded-t-2xl w-full py-3 px-4 outline-none bg-[#1c252e] border-b-[1px] border-b-slate-500 text-slate-100 '
				type='text'
				name='Search'
				id='search-input'
				placeholder='Search By Title'
				value={searchValue}
				onChange={handleSearchChange}
			/>

			<div className='mt-3 overflow-x-scroll'>
				<table className='w-full'>
					<TableHeader cells={postsTableHeaderCells} onSort={handleSortChange} />
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
