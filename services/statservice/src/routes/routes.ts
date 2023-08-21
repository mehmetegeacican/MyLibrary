import express from 'express';
import { getTotalBasedByAuthor } from '../controller/statController';



const router:express.Router = express.Router();

router.get('/all',getTotalBasedByAuthor);

export default router;