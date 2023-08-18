import express from 'express';
import {
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


export default router;

