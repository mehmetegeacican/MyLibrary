import express from 'express';
import { getTotalBasedByAuthor, getTotalBasedByCategory, getTotalBasedByStatuses } from '../controller/statController';
import  reqAuth from '../middleware/reqAuth';



const router:express.Router = express.Router();

//Middleware
router.use(reqAuth);

router.get('/all/authors/:id',getTotalBasedByAuthor);
router.get('/all/categories/:id',getTotalBasedByCategory);
router.get('/all/statuses/:id',getTotalBasedByStatuses);

export default router;