import { memo, useRef, useState } from 'react';

import PostUpsert from './post-upsert/PostUpsert';
import useUpsertPostMutation from 'src/services/posts/useUpsertPostMutation';
import { IUpsertPostMutation } from 'src/services/posts/interface';
import { toast } from 'react-toastify';
import queryClient from 'src/queryClient';

const AddNewPostButton = () => {
	const postUpsertRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		postUpsertRef?.current?.reset();
		setIsOpen(false);
	};
	const handleOpen = () => setIsOpen(true);

	const { mutate, isLoading } = useUpsertPostMutation(null, {
		onSuccess(_data, _variables, _context) {
			handleClose();
			toast.success('Post created successfully.');
		},
		onMutate: async (newPost) => {
			await queryClient.cancelQueries({ queryKey: ['posts'] });
			const previousPosts = queryClient.getQueryData(['posts']);
			queryClient.setQueryData(['posts'], (old: any) => [
				...old,
				{ ...newPost, id: Math.floor(Math.random() * 900) + 100 },
			]);

			return { previousPosts };
		},
		onError() {
			toast.error('Error creating post.');
		},
	});

	const handleConfirmation = (data: IUpsertPostMutation) => mutate(data);

	return (
		<>
			<div>
				<button
					className='px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center '
					onClick={handleOpen}
				>
					Add New
				</button>
			</div>
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
