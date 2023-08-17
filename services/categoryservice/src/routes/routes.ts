import express from 'express';
import {
    getAllCategories
} from '../controller/categoryController';

const router:express.Router = express.Router();

router.get('/all',getAllCategories);


export default router;

