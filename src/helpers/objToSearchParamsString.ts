type ObjToSearchParamsString = (
	obj?: Record<string, string | number | boolean | undefined>,
	searchKey?: 'name' | 'title' | 'category'
) => string;

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
