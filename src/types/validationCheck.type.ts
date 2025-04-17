// arrow function type using a type alias

export type TextValidationCheckType = (value: null | undefined | string) => string;
export type NumberValidationCheckType = (value: null | undefined | number) => number;
export type ArrayValidationCheckType = (value: null | undefined | Array<any>) => Array<any>;
export type profileImageUrlValidationCheckType = (url: null | undefined | string) => string;
export type ImageUrlValidationCheckType = (url: null | undefined | string) => Promise<string>;
