export const replaceObjectById = <T extends { id: number | string }>(
	array: T[],
	replacementObject: T,
): T[] => {
	const index = array.findIndex((obj) => obj.id === replacementObject.id);

	if (index === -1) {
		return array;
	}

	return [...array.slice(0, index), replacementObject, ...array.slice(index + 1)];
};

export const filterByKeyAndValue = ({
	arr,
	key,
	value,
}: {
	arr: any[] | undefined | null;
	key: string;
	value: string;
}) => {
	if (Array.isArray(arr) === false) return [];
	return arr?.filter((obj) => obj[key] === value);
};

const getMissingObjects = <T extends { [key: string]: any }>(
	smallArray: any[] = [],
	largeArray: T[] = [],
	key: keyof T | string,
): T[] => {
	if (!Array.isArray(smallArray) || !Array.isArray(largeArray)) {
		return largeArray;
	}

	const smallSet = new Set(smallArray.map((obj) => obj?.[key]));
	return largeArray.filter((obj) => obj && !smallSet.has(obj[key]));
};

export default getMissingObjects;
