import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import TextArea from 'src/components/shared/form/TextArea';
import TextInput from 'src/components/shared/form/TextInput';
import ProgressLoader from 'src/components/shared/loader/ProgressLoader';
import { IPost } from 'src/services/posts/interface';
import * as Yup from 'yup';

interface IPostUpsertProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
	isLoading?: boolean;
	initialValues?: IPost;
}

interface IPostUpsertForwardRef {
	reset: UseFormReset<{
		name?: string;
		body?: string;
	}>;
}

const PostUpsert = forwardRef<IPostUpsertForwardRef, IPostUpsertProps>(
	({ isOpen, onClose, onSubmit, isLoading, initialValues }, ref) => {
		useImperativeHandle(ref, () => ({
			reset,
		}));

		const validationSchema = Yup.object().shape({
			name: Yup.string().required().label('Name'),
			body: Yup.string().required().label('Description'),
		});

		const formOptions = { resolver: yupResolver(validationSchema) };
		const { register, handleSubmit, formState, reset } = useForm(formOptions);
		const { errors } = formState;

		return (
			<>
				{isOpen ? (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
						<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md'>
							<h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4'>
								{initialValues?.id ? 'Edit post' : 'Add new post'}
							</h3>
							<div className='mb-4'>
								<TextInput
									type='text'
									label='Title'
									placeholder='Title'
									required
									defaultValue={initialValues?.title}
									{...register('name')}
									disabled={isLoading}
									error={Boolean(errors.name?.message)}
									errorMessage={(errors.name?.message as any) || ''}
									autoFocus
								/>
								<TextArea
									placeholder='Description'
									label='Description'
									required
									defaultValue={initialValues?.body}
									{...register('body')}
									disabled={isLoading}
									error={Boolean(errors.body?.message)}
									errorMessage={(errors.body?.message as any) || ''}
								/>
							</div>
							<div className='flex justify-end space-x-4'>
								<button
									className='px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
									onClick={onClose}
									disabled={isLoading}
									type='button'
								>
									Cancel
								</button>
								<button
									className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center ${
										isLoading ? 'opacity-70 cursor-not-allowed' : ''
									}`}
									onClick={() => handleSubmit(onSubmit)()}
									disabled={isLoading}
									type='submit'
								>
									{isLoading ? <ProgressLoader /> : 'Submit'}
								</button>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</>
		);
	}
);

PostUpsert.displayName = 'PostUpsert';

export default PostUpsert;
