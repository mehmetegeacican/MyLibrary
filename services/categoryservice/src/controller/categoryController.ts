import express from 'express';
import { addNewCategory, checkCategoryAlreadyExists, getAll } from '../models/categoryModel';
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
        //Step 1 -- Validate
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        //Step 2 --Check if a category like that already exists
        const check = await checkCategoryAlreadyExists(name,info);
        if(check){
            return res.status(400).json({ error : "Category Already Exists!" });
        }
        //Step 2 -- If Checks are applied, create a new category
        const result = await addNewCategory(name,info);
        return res.status(201).json({data:result,message:"Data successfully inserted"});
    }
    catch(e){
        const err = "Db Connection not established";
        res.status(500).json({error:err});
    }
}