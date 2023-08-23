import express from 'express';
import { getTotalBasedByAuthor, getTotalBasedByCategory, getTotalBasedByStatuses } from '../controller/statController';



const router:express.Router = express.Router();

router.get('/all/authors',getTotalBasedByAuthor);
router.get('/all/categories',getTotalBasedByCategory);
router.get('/all/statuses',getTotalBasedByStatuses);

export default router;