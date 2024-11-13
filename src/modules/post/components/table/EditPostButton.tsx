import { FC, memo, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IPost, IUpsertPostMutation } from 'src/services/posts/interface';
import useUpsertPostMutation from 'src/services/posts/useUpsertPostMutation';
import PostUpsert from '../post-upsert/PostUpsert';
import { toast } from 'react-toastify';
import IconButton from 'src/components/shared/button/IconButton';

interface IEditPostButtonProps {
	post: IPost;
}

const EditPostButton: FC<IEditPostButtonProps> = ({ post }) => {
	const postUpsertRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		postUpsertRef?.current?.reset();
		setIsOpen(false);
	};
	const handleOpen = () => setIsOpen(true);

	const { mutate, isLoading } = useUpsertPostMutation(post.id, {
		onSuccess() {
			handleClose();
			toast.success('Post updated successfully.');
		},
		onError() {
			toast.error('Error updating post.');
		},
	});

	const handleConfirmation = (data: IUpsertPostMutation) => mutate(data);

	return (
		<>
			<IconButton onClick={handleOpen}>
				<AiOutlineEdit size={22} />
			</IconButton>
			<PostUpsert
				ref={postUpsertRef}
				isOpen={isOpen}
				onClose={handleClose}
				onSubmit={handleConfirmation}
				isLoading={isLoading}
				initialValues={post}
			/>
		</>
	);
};

export default memo(EditPostButton);
