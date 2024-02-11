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
import reqAuth from '../middleware/reqAuth';
const router:express.Router = express.Router();
// Middleware
router.use(reqAuth);

router.get('/all/:id',getAllCategories);
router.post('/',CategoryDataRequestBodyValidate(),postNewCategory);
router.delete('/:id',CategoryDataIDValidate(),deleteExistingCategory);
router.put('/:id',CategoryDataIDValidate(),CategoryDataRequestBodyValidate(),updateExistingCategory);


export default router;

