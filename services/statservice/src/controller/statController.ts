import express from 'express';
import { executeGetAuthorCounts, executeGetCategoryCounts } from '../model/statModel';


/**
 * This is the controller for getting all of the book counts based on author
 * @param req the Request
 * @param res the Response
 */
export const getTotalBasedByAuthor = async (req: express.Request, res: express.Response) => {
    try {
        const data = await executeGetAuthorCounts();
        res.json(data);
    }
    catch (e) {
        console.log(e);
        const err = "Db Connection not established";
        res.status(500).json({ error: err });
    }
}
/**
 * This is the controller for getting all of the book counts based on category
 * @param req Request
 * @param res Response
 */
export const getTotalBasedByCategory = async (req: express.Request, res: express.Response) => {
    try {
        const data = await executeGetCategoryCounts();
        res.json(data);
    }
    catch (e) {
        console.log(e);
        const err = "Db Connection not established";
        res.status(500).json({ error: err });
    }
}