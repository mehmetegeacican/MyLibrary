import express from 'express';
import { getTotalBasedByAuthor, getTotalBasedByCategory, getTotalBasedByStatuses } from '../controller/statController';



const router:express.Router = express.Router();

router.get('/all/authors/:id',getTotalBasedByAuthor);
router.get('/all/categories/:id',getTotalBasedByCategory);
router.get('/all/statuses/:id',getTotalBasedByStatuses);

export default router;