import { memo, useRef, useState } from 'react';

import PostUpsert from './post-upsert/PostUpsert';
import useUpsertPostMutation from 'src/services/posts/useUpsertPostMutation';
import { IUpsertPostMutation } from 'src/services/posts/interface';
import { toast } from 'react-toastify';
import Button from 'src/components/shared/button/Button';

const AddNewPostButton = () => {
	const postUpsertRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => {
		postUpsertRef?.current?.reset();
		setIsOpen(false);
	};

	const { mutate, isLoading } = useUpsertPostMutation(null, {
		onSuccess(_data, _variables, _context) {
			handleClose();
			toast.success('Post created successfully.');
		},
		onError() {
			toast.error('Error creating post.');
		},
	});

	const handleConfirmation = (data: IUpsertPostMutation) => mutate(data);

	return (
		<>
			<Button color='primary' onClick={handleOpen}>
				Add New
			</Button>
			<PostUpsert
				ref={postUpsertRef}
				isOpen={isOpen}
				onClose={handleClose}
				onSubmit={handleConfirmation}
				isLoading={isLoading}
			/>
		</>
	);
};

export default memo(AddNewPostButton);
