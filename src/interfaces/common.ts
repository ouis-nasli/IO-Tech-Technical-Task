import { AxiosError } from 'axios';

export type HttpError = AxiosError<{
	message: string;
	error: string;
	args?: string[];
}>;
export interface IRootObj<T = any> {
	data: T;
}

export interface ISuccessMutation {
	success: string;
}

export interface IErrorMutation {
	error: string;
}
