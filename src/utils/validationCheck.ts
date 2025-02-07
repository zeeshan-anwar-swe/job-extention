import {
	ArrayValidationCheckType,
	NumberValidationCheckType,
	TextValidationCheckType,
} from '../types/validationCheck.type';

export const textValidationCheck: TextValidationCheckType = (value) => {
	if (value === null || value === undefined || value === '') {
		return 'N/A';
	}
	return value;
};

export const numberValidationCheck: NumberValidationCheckType = (value) => {
	if (value === null || value === undefined) {
		return 0;
	}
	return value;
};

export const arrayValidationCheck: ArrayValidationCheckType = (value) => {
	if (value === null || value === undefined) {
		return [];
	}
	return value;
};
