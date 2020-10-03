export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if(value) return undefined;
    return "Field as requaired"
}

export const maxLengthCreater = (maxLength: number): FieldValidatorType => (value) => {
    if(value && value.length > maxLength) return `Max length is ${maxLength} simbols`;
    return undefined;
}
