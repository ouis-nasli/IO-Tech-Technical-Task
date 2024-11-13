import { UseMutationOptions, useMutation } from 'react-query';
import { _axios } from '../httpConfig';
import { HttpError } from 'src/interfaces/common';
import queryClient from 'src/queryClient';
import { toast } from 'react-toastify';

export function usePostDeleteMutation(id: number, options?: UseMutationOptions<boolean, HttpError, number>) {
	return useMutation((id: number) => _axios.delete<boolean>(`/posts/${id}`).then((res) => res.data), {
		...options,
		// We can get rid of "onMutation" by adding "invalidatePostsQuery", but the API doesn't apply delete on the server
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['posts'] });
			const previousPosts = queryClient.getQueryData(['posts']);
			queryClient.setQueryData(['posts'], (old: any) => old?.filter((item) => item.id !== id));

			return { previousPosts };
		},

		onError(_error, _variables, _context) {
			// We can add the error message from the server, but it doesn't return any error
			toast.error('Something went wrong');
		},
	});
}

export default usePostDeleteMutation;
