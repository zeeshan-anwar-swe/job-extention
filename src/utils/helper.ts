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

export function findObjectById<T extends { id: string | number }>(
	array: T[],
	id: string | number,
): T | undefined {
	return array.find((item) => item.id === id);
}

export function formatDateStringToYYYYMMDD(dateString: string | undefined): string {
	if (!dateString) return '';
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
