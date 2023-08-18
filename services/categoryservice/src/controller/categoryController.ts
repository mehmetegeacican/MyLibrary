import express from 'express';
import { addNewCategory, checkCategoryAlreadyExists, checkCategoryAlreadyExistsByID, deleteCategory, getAll, updateCategory } from '../models/categoryModel';
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
        const check = await checkCategoryAlreadyExists(name);
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

/**
 * The API Function to delete an Existing Category
 * @param req The request
 * @param res The response
 * @returns the json content with message
 */
export const deleteExistingCategory =async (req:express.Request,res:express.Response) => {
    try{
        //Step 0 --> The ID params
        const { id } = req.params;
        //Step 1 -- Validate
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        //Step 2 -- Check if an ID like that already exists!
        const check = await checkCategoryAlreadyExistsByID(parseInt(id));
        if(!check){
            return res.status(400).json({ error : "The Following ID does not exist!" });
        }
        //Step 3 -- Checks are completed, delete data
        const result = await deleteCategory(parseInt(id));
        return res.status(200).json({data:result,message:"Category deleted successfully"});
    }
    catch(e){
        const err = "Db Connection not established";
        res.status(500).json({error:err});
    }
};

/**
 * API Function to update an Existing category
 * @param req The request
 * @param res The response
 * @returns 
 */
export const updateExistingCategory =async (req:express.Request,res:express.Response) => {
    try{
        //Step 0 --> The ID params
        const { id } = req.params;
        const {name,info} = req.body;
        //Step 1 -- Validate
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        //Step 2 -- Check if an ID like that already exists!
        const check = await checkCategoryAlreadyExistsByID(parseInt(id));
        if(!check){
            return res.status(400).json({ error : "The Following ID does not exist!" });
        }
        //Step 3 -- Checks are completed, update data
        const result = await updateCategory(parseInt(id),{name:name,info:info});
        return res.status(200).json({data:result,message:"Category updated successfully"});
    }
    catch(e){
        const err = "Db Connection not established";
        res.status(500).json({error:err});
    }
};