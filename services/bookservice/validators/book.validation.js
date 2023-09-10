const { check } = require('express-validator');

const bookDataIDValidate = () => [
    check('id').notEmpty().withMessage('ID is required'),
    check('id').isInt().withMessage('ID should be declared as an integer'),
];


/**
 * Custom Validation Value for Checking if the variable is array of strings
 * @param {*} value 
 * @returns 
 */
const isArrayofStrings = (value) => {
    if (!Array.isArray(value)) {
        return false;
    }

    for (const item of value) {
        if (typeof item !== 'string') {
            return false;
        }
    }
    return true;
};

const bookBodyValidate = () => [
    check('bookName').notEmpty().withMessage('Book Name is Required'),
    check('bookName').isString().withMessage('Book Name must be a string'),
    check('desc').notEmpty().withMessage('Description is required'),
    check('desc').isString().withMessage('Description  must be a string'),
    check('bookStatus').notEmpty().withMessage('Status must not be empty'),
    check('bookStatus').isString().withMessage('Status must be a string'),
    check('bookStatus').isIn(['Red', 'Reading', 'Will Read']).withMessage('Status can only be one of the three: Red, Reading, Will Read'),
    check('bookCategories').custom(isArrayofStrings).withMessage('The Categories must be an array of strings'),
]

module.exports = {
    bookDataIDValidate,
    bookBodyValidate
}