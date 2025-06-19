import { body } from "express-validator"


const registerValidator = [
    body("name")
        .exists().withMessage("name is Missing")
        .isString().withMessage("name must be a string")
        .notEmpty().withMessage("name must not be empty")
        .isLength({ max: 40 })
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
        .isStrongPassword({ minLength: 8, minLowercase: 2, minUppercase: 2, minNumbers: 2, minSymbols: 1 }).withMessage("Password must be strong with 2{a-z} 2{A-Z} 2{0-9} 2{!@#$%^&*()_+;'} and minimum length of 8"),

    body("role")
        .exists().withMessage("role is Missing")
        .isString().withMessage("role must be a string")
        .notEmpty().withMessage("role must not be empty")
        .trim()
        .custom(value => {
            const upperValue = value.toUpperCase()
            if (upperValue === "OWNER" || upperValue === "CUSTOMER")
                return true
            else {
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

const restaurantValidator = [
    // name        String
    // location    String
    // description String? @default("")
    // ownerId String 
    body("name")
        .exists().withMessage("name is Missing")
        .isString().withMessage("name must be a string")
        .notEmpty().withMessage("name must not be empty")
        .isLength({ max: 40 })
        .trim(),

    body("location")
        .exists().withMessage("location is Missing")
        .isString().withMessage("location must be a string")
        .notEmpty().withMessage("location must not be empty")
        .isLength({ max: 160 })
        .trim(),

    body("description")
        .isString().withMessage("description must be a string")
        .optional()
        .isLength({ max: 1000 })
        .trim(),
]

const tableValidator = [
    //   tableNumber Int (should be unique)
    //   seats       Int
    //   isAvailable Boolean
    //   restaurantId String
    body("tableNumber")
        .exists().withMessage("tableNumber is Missing")
        .toInt()
        .isInt({min: 0}).withMessage("tableNumber must be an integer and greater than 0"),
    body("seats")
        .exists().withMessage("seats is Missing")
        .toInt()
        .isInt({min: 1}).withMessage("seats must be an integer and should be at least 1"),
    body("isAvailable")
        .exists().withMessage("isAvailable is Missing")
        .custom(value => {
            if(value === true || value === false) return true
            else return false
        }).withMessage("isAvailable must be boolean") 
]

export { registerValidator, loginValidator, restaurantValidator, tableValidator }
