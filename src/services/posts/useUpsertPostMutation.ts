import { UseMutationOptions, useMutation } from 'react-query';
import { HttpError } from 'src/interfaces/common';
import { _axios } from '../httpConfig';
import { IPost, IUpsertPostMutation } from './interface';
import queryClient from 'src/queryClient';
import { toast } from 'react-toastify';

export function useUpsertPostMutation(
	id?: number | null,
	options?: UseMutationOptions<boolean, HttpError, IUpsertPostMutation>
) {
	return useMutation((params) => (id ? updateFunc(id, params) : createFunc(params)), {
		...options,
		onMutate: async (updatedPost) => {
			id ? updateMutation(updatedPost, id) : createMutation(updatedPost);
		},
		onError() {
			toast.error('Error updating post.');
		},
	});
}

const updateFunc = (id: number, params: IUpsertPostMutation) =>
	_axios.patch<boolean>(`/posts/${id}`, params).then((res) => res.data);
const createFunc = (params: IUpsertPostMutation) => _axios.post<boolean>(`/posts`, params).then((res) => res.data);

const updateMutation = (updatedPost: IUpsertPostMutation, id: number) => {
	queryClient.cancelQueries({ queryKey: ['posts'] });
	const previousPosts = queryClient.getQueryData(['posts']);
	queryClient.setQueryData(['posts'], (old: IPost[]) => [
		...old.map((oldPost) => (oldPost.id !== id ? oldPost : { ...oldPost, ...updatedPost })),
	]);

	return { previousPosts };
};
const createMutation = (newPost: IUpsertPostMutation) => {
	queryClient.cancelQueries({ queryKey: ['posts'] });
	const previousPosts = queryClient.getQueryData(['posts']);
	queryClient.setQueryData(['posts'], (old: any) => [...old, { ...newPost, id: Math.floor(Math.random() * 900) + 100 }]);

	return { previousPosts };
};

export default useUpsertPostMutation;
