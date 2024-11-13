import Button from '../button/Button';

interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isLoading?: boolean;
	message?: string;
	confirmText?: string;
	cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	isLoading = false,
	message = 'Are you sure you want to delete this item?',
	confirmText = 'Delete',
	cancelText = 'Cancel',
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md'>
				<h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4'>Confirm Action</h3>
				<p className='text-gray-600 dark:text-gray-300 mb-6'>{message}</p>
				<div className='flex justify-end space-x-4'>
					<Button variant='text' onClick={onClose} disabled={isLoading}>
						{cancelText}
					</Button>
					<Button color='error' onClick={onConfirm} isLoading={isLoading}>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
