import express from 'express';
import { getAll } from '../models/categoryModel';
/**
 * This is the controller for getting all of the categories
 * @param req the Request
 * @param res the Response
 */
export const getAllCategories = async (req:express.Request,res:express.Response) => {
    try{
        const data = await getAll();
        res.json(data);
    }
    catch(error){
        const err = "Db Connection not established";
        res.status(500).json({ error: err });
    }
}