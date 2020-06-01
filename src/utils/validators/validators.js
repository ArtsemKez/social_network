export const required = (value) => {
    if(value) return undefined;
    return "Field as requaired"
}

export const maxLengthCreater = (maxLength) => (value) => {
    if(value && value.length > maxLength) return `Max length is ${maxLength} simbols`;
    return undefined;
}