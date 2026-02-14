import { body, param, query, validationResult } from "express-validator";

export const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

export const getAllMindMapsValidation = [
    query('ownerId')
        .exists().withMessage('ownerId is required')
        .isString().withMessage('ownerId must be a string')
        .notEmpty().withMessage('ownerId cannot be empty'),
    validate
];

export const getMindMapByIdValidation = [
    param('id')
        .trim()
        .isMongoId().withMessage("Id must be a valid mongo id, 24 character hex string, 12 byte Uint8Array, or an integer"),
    validate
]

export const postMindMapValidation = [
    query('ownerId')
        .exists().withMessage("Owner Id is required")
        .notEmpty().withMessage("Owner Id can not be empty")
        .isString().withMessage("Owner Id must be a string"),
    body('title')
        .exists().withMessage("Mind Map title is required")
        .isString().withMessage("Mind Map title must be a string")
        .notEmpty().withMessage("Mind Map title can not be empty"),
    validate
]


export const putMindMapValidation = [
    param('id')
        .trim()
        .isMongoId().withMessage("Id must be a valid mongo id, 24 character hex string, 12 byte Uint8Array, or an integer"),
    body('title')
        .exists().withMessage("Mind Map title is required")
        .isString().withMessage("Mind Map title must be a string")
        .notEmpty().withMessage("Mind Map title can not be empty"),
    validate
]

export const deleteMindMapByIdValidation = [
    param('id')
        .trim()
        .isMongoId().withMessage("Id must be a valid mongo id, 24 character hex string, 12 byte Uint8Array, or an integer"),
    validate
]


