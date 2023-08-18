import { check } from "express-validator";

export const CategoryDataIDValidate = () => [
    check('id').notEmpty().withMessage("ID is required"),
    check('id').isInt().withMessage("ID should be declared as integer")
];

export const CategoryDataRequestBodyValidate = () => [
    check('name').notEmpty().withMessage("Name is required"),
    check('name').isString().withMessage("Name should be a string"),
    check('info').isString().withMessage("Info should be a string")
];



