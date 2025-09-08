const getMissingObjects = <T extends { [key: string]: any }>(
  smallArray: any[] = [],
  largeArray: T[] = [],
  key: keyof T | string
): T[] => {
  if (!Array.isArray(smallArray) || !Array.isArray(largeArray)) {
    return largeArray;
  }

  const smallSet = new Set(smallArray.map(obj => obj?.[key]));
  return largeArray.filter(obj => obj && !smallSet.has(obj[key]));
};

export default getMissingObjects;