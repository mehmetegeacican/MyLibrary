import express from 'express';
import { getTotalBasedByAuthor, getTotalBasedByCategory } from '../controller/statController';



const router:express.Router = express.Router();

router.get('/all/authors',getTotalBasedByAuthor);
router.get('/all/categories',getTotalBasedByCategory);

export default router;