import { formatString } from "./helper"

interface LabeledOption {
  label: string;
  value: string;
}

export const getLabedOptionFromEnum = (enumObject: object): LabeledOption[] => {
  // Use Object.values to get an array of the enum's string values
  return Object.values(enumObject).map((item) => ({
    label: formatString(item as string),
    value: item as string
  }));
};