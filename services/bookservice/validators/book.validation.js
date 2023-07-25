const {check} = require('express-validator');

const bookDataValidate = () => [
    check('id').notEmpty().withMessage('ID is required'),
    check('id').isInt().withMessage('ID should be declared as an integer'),
];

module.exports = {
    bookDataValidate
}