import { UseMutationOptions, useMutation } from 'react-query';
import { _axios } from '../httpConfig';
import { HttpError } from 'src/interfaces/common';

export function usePostDeleteMutation(options?: UseMutationOptions<boolean, HttpError, number>) {
	return useMutation((id: number) => _axios.delete<boolean>(`/posts/${id}`).then((res) => res.data), options);
}

export default usePostDeleteMutation;
