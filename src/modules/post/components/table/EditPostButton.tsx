import { FC, memo, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IPost, IUpsertPostMutation } from 'src/services/posts/interface';
import useUpsertPostMutation from 'src/services/posts/useUpsertPostMutation';
import PostUpsert from '../post-upsert/PostUpsert';
import { toast } from 'react-toastify';

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
		onSuccess(_data, _variables, _context) {
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
			<div className='p-2 hover:bg-[#212c37] rounded-full cursor-pointer transition' onClick={handleOpen}>
				<AiOutlineEdit size={22} />
			</div>
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
