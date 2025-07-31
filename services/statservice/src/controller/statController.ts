import express from 'express';
import { executeGetAuthorCounts, executeGetAverageLikedOfAuthors, executeGetAverageLikedOfCategories, executeGetCategoryCounts, executeGetStatusCounts } from '../model/statModel';


/**
 * This is the controller for getting all of the book counts based on author
 * @param req the Request
 * @param res the Response
 */
export const getTotalBasedByAuthor = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const data = await executeGetAuthorCounts(parseInt(id));
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
        const { id } = req.params;
        const data = await executeGetCategoryCounts(parseInt(id));
        res.json(data);
    }
    catch (e) {
        console.log(e);
        const err = "Db Connection not established";
        res.status(500).json({ error: err });
    }
}
/**
 * The Controller to get the stats based on the status
 * @param req Request
 * @param res Response
 */
export const getTotalBasedByStatuses = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const data = await executeGetStatusCounts(parseInt(id));
        res.json(data);
    } catch (e) {
        console.log(e);
        const err = "Db Connection not established";
        res.status(500).json({ error: err });
    }
}

/**
 * Gets Average of Liked points, Sum of liked points, number of books by author
 * @param req 
 * @param res 
 */
export const getAvgLikedOfAuthors = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const data = await executeGetAverageLikedOfAuthors(parseInt(id));
        res.json(data);
    } catch (e) {
        console.log(e);
        const err = "Db Connection not established";
        res.status(500).json({ error: err });
    }
}
/**
 * Gets Average of Liked points, Sum of liked points, number of books by category 
 * @param req 
 * @param res 
 */
export const getAvgLikedOfCategories = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const data = await executeGetAverageLikedOfCategories(parseInt(id));
        res.json(data);
    } catch (e) {
        console.log(e);
        const err = "Db Connection not established";
        res.status(500).json({ error: err });
    }
}