export function addOrRemoveObject<T extends Record<string, any>>(array: T[], newObject: T): T[] {
	const existingIndex = array.findIndex((item) => item.id === newObject.id);
	return existingIndex === -1
		? [...array, newObject]
		: array.filter((_, index) => index !== existingIndex);
}

export function objectExistsInArray<T extends Record<string, any>>(
	array: T[],
	objectToCheck: T,
): boolean {
	return array.some((item) => item.id === objectToCheck.id);
}
