import express from 'express';
import { addNewCategory, getAll } from '../models/categoryModel';
import { validationResult } from 'express-validator';

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
    catch{
        const err = "Db Connection not established";
        res.status(500).json({ error: err });
    }
}

/**
 * This function posts a new category
 * @param req Request
 * @param res Response
 */
export const postNewCategory = async (req:express.Request,res:express.Response) => {
    try{
        const {name,info} = req.body;
        console.log(name,info);
        //Step 1 -- Validate
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        //Step 2 -- If Checks are applied, create a new category
        const result = await addNewCategory(name,info);
        return res.status(201).json({data:result});
    }
    catch(e){
        const err = "Db Connection not established";
        res.status(500).json({error:err});
    }
}