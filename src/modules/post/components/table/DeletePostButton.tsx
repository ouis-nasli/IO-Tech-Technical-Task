import { FC, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import IconButton from 'src/components/shared/button/IconButton';
import ConfirmationModal from 'src/components/shared/popup/DeletePopup';
import usePostDeleteMutation from 'src/services/posts/useDeletePostMutation';

interface IDeletePostButtonProps {
	id: number;
}

const DeletePostButton: FC<IDeletePostButtonProps> = ({ id }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);
	const handleOpen = () => setIsOpen(true);

	const { mutate, isLoading } = usePostDeleteMutation(id, {
		onSuccess(_data, _variables, _context) {
			toast.success('Deleted successfully');
			handleClose();
		},
	});

	const handleConfirmation = () => mutate(id);

	return (
		<>
			<IconButton variant='error' onClick={handleOpen}>
				<MdDeleteOutline size={22} />
			</IconButton>

			<ConfirmationModal isLoading={isLoading} isOpen={isOpen} onClose={handleClose} onConfirm={handleConfirmation} />
		</>
	);
};

export default DeletePostButton;
