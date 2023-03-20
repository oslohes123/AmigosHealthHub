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

export const isFloat = (containsFloat: any) => {
    return validator.isFloat(containsFloat)
}

export const isInt = (containsInt: any) => {
    return validator.isInt(containsInt)
}

export const eitherIsFloatOrInt = (containsIntOrFloat: any) => {
    return validator.isInt(containsIntOrFloat) || validator.isFloat(containsIntOrFloat)
}

export const covertStringToNumber  = (stringWNumber: string) =>{
    let number = Number(stringWNumber)
    return number
}
