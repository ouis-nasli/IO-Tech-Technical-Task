import ProgressLoader from '../loader/ProgressLoader';

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
					<button
						className='px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
						onClick={onClose}
					>
						{cancelText}
					</button>
					<button
						className={`px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center justify-center ${
							isLoading ? 'opacity-70 cursor-not-allowed' : ''
						}`}
						onClick={onConfirm}
						disabled={isLoading}
					>
						{isLoading ? <ProgressLoader /> : confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
