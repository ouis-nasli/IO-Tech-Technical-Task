import { UseMutationOptions, useMutation } from 'react-query';
import { HttpError } from 'src/interfaces/common';
import { _axios } from '../httpConfig';
import { IUpsertPostMutation } from './interface';

export function useUpsertPostMutation(
	id?: number | null,
	options?: UseMutationOptions<boolean, HttpError, IUpsertPostMutation>
) {
	return useMutation((params) => (id ? updateFunc(id, params) : createFunc(params)), options);
}

const updateFunc = (id: number, params: IUpsertPostMutation) =>
	_axios.patch<boolean>(`/posts/${id}`, params).then((res) => res.data);
const createFunc = (params: IUpsertPostMutation) => _axios.post<boolean>(`/posts`, params).then((res) => res.data);

export default useUpsertPostMutation;
