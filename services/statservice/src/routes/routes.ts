import express from 'express';
import { getTotalBasedByAuthor, getTotalBasedByCategory, getTotalBasedByStatuses, getAvgLikedOfAuthors, getAvgLikedOfCategories} from '../controller/statController';
import  reqAuth from '../middleware/reqAuth';



const router:express.Router = express.Router();

//Middleware
router.use(reqAuth);

router.get('/all/authors/:id',getTotalBasedByAuthor);
router.get('/all/categories/:id',getTotalBasedByCategory);
router.get('/all/statuses/:id',getTotalBasedByStatuses);
router.get('/all/liked/authors/:id',getAvgLikedOfAuthors);
router.get('/all/liked/categories/:id',getAvgLikedOfCategories);

export default router;