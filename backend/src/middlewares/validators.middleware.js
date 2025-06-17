import { body } from "express-validator"


const registerValidator =  [
    body("name")
        .exists().withMessage("name is Missing")
        .isString().withMessage("name must be a string")
        .notEmpty().withMessage("name must not be empty")
        .trim(),

    body("email")
        .exists().withMessage("email is Missing")
        .isString().withMessage("email must be a string")
        .notEmpty().withMessage("email must not be empty")
        .isEmail().withMessage("email's passed value is not an email")
        .trim(),

    body("passwordHash")
        .exists().withMessage("password is missing")
        .isString().withMessage("password must be a string")
        .notEmpty().withMessage("password must not be empty")
        .isStrongPassword({minLength: 8, minLowercase: 2, minUppercase: 2, minNumbers: 2, minSymbols: 1}).withMessage("Password must be strong with 2{a-z} 2{A-Z} 2{0-9} 2{!@#$%^&*()_+;'} and minimum length of 8"),

    body("role")
        .exists().withMessage("role is Missing")
        .isString().withMessage("role must be a string")
        .notEmpty().withMessage("role must not be empty")
        .trim()
        .custom(value => {
            const upperValue = value.toUpperCase()
            if(upperValue === "OWNER" || upperValue === "CUSTOMER")
                return true
            else{
                throw false
            }
        }).withMessage("role must be an owner or a customer")
        .toUpperCase(),
    ]

const loginValidator = [
        body("email")
            .exists().withMessage("email is Missing")
            .isString().withMessage("email must be a string")
            .notEmpty().withMessage("email must not be empty")
            .isEmail().withMessage("email's passed value is not an email"),
        body("password")
            .exists().withMessage("password is missing")
            .isString().withMessage("password must be a string")
    ]

export { registerValidator, loginValidator }
