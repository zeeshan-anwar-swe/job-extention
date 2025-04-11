export function updateJobStatusByResponse<T extends { id: any; status: any }>(
	arr: T[],
	updateObj: { id: any; status: any },
): T[] {
	return arr.map((item) =>
		item.id === updateObj.id ? { ...item, status: updateObj.status } : item,
	);
}
