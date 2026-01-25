import { param, query, validationResult } from "express-validator";

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
        .exists().withMessage("Id is required")
        .isString().withMessage("Id must be a string")
        .notEmpty().withMessage('Id cannot be empty')
        .isMongoId().withMessage("Id must be a valid mongo id, 24 character hex string, 12 byte Uint8Array, or an integer"),
    validate
]


