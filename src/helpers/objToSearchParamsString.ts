type ObjToSearchParamsString = (
	obj?: Record<string, string | number | boolean | undefined>,
	searchKey?: 'name' | 'title' | 'category'
) => string;

/**
 * Converts an object to a URL search parameters string.
 *
 * @function
 * @param {Record<string, string | number | boolean | undefined>} [obj] - The object to convert to search parameters.
 * Each key-value pair in the object is added as a search parameter.
 * @param {'name' | 'title' | 'category'} [searchKey='name'] - The key to use if the object contains a 'search' key.
 * Defaults to 'name'.
 * @returns {string} - The resulting URL search parameters string.
 *
 * @example
 * // Basic usage:
 * const paramsString = objToSearchParamsString({ name: 'John', age: 30 });
 * // Output: 'name=John&age=30'
 *
 * @example
 * // Using a custom search key:
 * const paramsString = objToSearchParamsString({ search: 'React' }, 'title');
 * // Output: 'title=React'
 *
 * @example
 * // Handling undefined values:
 * const paramsString = objToSearchParamsString({ name: 'John', age: undefined });
 * // Output: 'name=John'
 *
 * @example
 * // Passing an empty object:
 * const paramsString = objToSearchParamsString({});
 * // Output: ''
 */

export const objToSearchParamsString: ObjToSearchParamsString = (obj, searchKey = 'name') => {
	if (!obj) return '';

	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(obj)) {
		if (value) {
			const k = key === 'search' ? searchKey : key;
			params.append(k, value.toString());
		}
	}

	return params.toString();
};
