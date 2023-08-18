import express from 'express';
import {
    deleteExistingCategory,
    getAllCategories,
    postNewCategory
} from '../controller/categoryController';
 import {
    CategoryDataIDValidate,
    CategoryDataRequestBodyValidate
 } from '../validators/category.validation';

const router:express.Router = express.Router();

router.get('/all',getAllCategories);
router.post('/',CategoryDataRequestBodyValidate(),postNewCategory);
router.delete('/:id',CategoryDataIDValidate(),deleteExistingCategory);


export default router;

