import express from 'express';
import {
    deleteExistingCategory,
    getAllCategories,
    postNewCategory,
    updateExistingCategory
} from '../controller/categoryController';
 import {
    CategoryDataIDValidate,
    CategoryDataRequestBodyValidate
 } from '../validators/category.validation';

const router:express.Router = express.Router();

router.get('/all',getAllCategories);
router.post('/',CategoryDataRequestBodyValidate(),postNewCategory);
router.delete('/:id',CategoryDataIDValidate(),deleteExistingCategory);
router.put('/:id',CategoryDataIDValidate(),CategoryDataRequestBodyValidate(),updateExistingCategory);


export default router;

