const validator = require('validator');

export const isEmail = (email: string) => {
    return validator.isEmail(email)
}

export const isAlpha = (containsAlpha: string) => {
    return validator.isAlpha(containsAlpha)
}
export const isStrongPassword = (password: string) => {
    return validator.isStrongPassword(password)
}

// export const isInt = (number: number) => {
//     return validator.isInt(number);
// }
