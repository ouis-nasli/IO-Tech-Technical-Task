import { FC, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import ConfirmationModal from 'src/components/shared/popup/DeletePopup';
import queryClient from 'src/queryClient';
import usePostDeleteMutation from 'src/services/posts/useDeletePostMutation';

interface IDeletePostButtonProps {
	id: number;
}

const DeletePostButton: FC<IDeletePostButtonProps> = ({ id }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);
	const handleOpen = () => setIsOpen(true);

	const { mutate, isLoading } = usePostDeleteMutation({
		// We can get rid of "onMutation" by adding "invalidatePostsQuery", but the API doesn't apply delete on the server
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['posts'] });
			const previousPosts = queryClient.getQueryData(['posts']);
			queryClient.setQueryData(['posts'], (old: any) => old?.filter((item) => item.id !== id));

			return { previousPosts };
		},

		onSuccess(_data, _variables, _context) {
			// invalidatePostsQuery();
			toast.success('Deleted successfully');
			handleClose();
		},

		onError(_error, _variables, _context) {
			// We can add the error message from the server, but it doesn't return any error
			toast.error('Something went wrong');
		},
	});

	const handleConfirmation = () => mutate(id);

	return (
		<>
			<div className='p-2 hover:bg-[#212c37] rounded-full cursor-pointer transition' onClick={handleOpen}>
				<MdDeleteOutline size={22} />
			</div>
			<ConfirmationModal isLoading={isLoading} isOpen={isOpen} onClose={handleClose} onConfirm={handleConfirmation} />
		</>
	);
};

export default DeletePostButton;
