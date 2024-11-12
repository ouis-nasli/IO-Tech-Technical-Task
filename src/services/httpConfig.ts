import axios from 'axios';

export const baseUrl = 'https://jsonplaceholder.typicode.com';

export const _axios = axios.create({
	baseURL: baseUrl,
});
