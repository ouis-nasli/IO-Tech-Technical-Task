import { FC } from 'react';
import { IPost } from 'src/services/posts/interface';
import { AiOutlineEdit } from 'react-icons/ai';
import DeletePostButton from './DeletePostButton';

interface ITableRowProps {
	post: IPost;
}

const TableRow: FC<ITableRowProps> = ({ post }) => {
	const { body, id, title } = post;
	return (
		<tr className='hover:bg-[#1d2731] text-slate-300'>
			<td className='px-4 py-3'>{id}</td>
			<td className='px-4 py-3'>{title}</td>
			<td className='px-4 py-3'>{body}</td>
			<td className='' width={100}>
				<div className='flex'>
					<div className='p-2 hover:bg-[#212c37] rounded-full cursor-pointer transition'>
						<AiOutlineEdit size={22} />
					</div>
					<DeletePostButton id={id} />
				</div>
			</td>
		</tr>
	);
};

export default TableRow;
