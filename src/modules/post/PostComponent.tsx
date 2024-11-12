import { MdCircle } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import AddNewPostButton from './components/AddNewPostButton';

const PostComponent = () => {
	return (
		<div className='px-24 pt-8 '>
			<div className='flex items-center justify-between'>
				<div>
					<div>
						<h1 className='text-gray-100 text-3xl font-bold'>Posts</h1>
					</div>
					<div className='text-gray-400 flex items-center gap-x-2'>
						<p>Post</p>
						<MdCircle size={8} />
						<p>List</p>
					</div>
				</div>
				<AddNewPostButton />
			</div>
			<Outlet />
		</div>
	);
};

export default PostComponent;
