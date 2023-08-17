import express from 'express';
/**
 * This is the controller for getting all of the categories
 * @param req the Request
 * @param res the Response
 */
export const getAllCategories = (req:express.Request,res:express.Response) => {
    try{
        res.json({message:"All Categories Retrieved"});
    }
    catch(error){
        res.send({error:error});
    }
}