export function tryParse<T = unknown>(json: string): null | T {
	try {
		return JSON.parse(json);
	} catch (err) {
		return null;
	}
}
