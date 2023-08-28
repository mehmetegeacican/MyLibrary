

import { postNewBook, updateABook } from '../../apis/bookApi';
import { useEffect } from 'react';
import { ApiResult, ICategory } from '../../interfaces/DataInterfaces';
import { defaultBookCategories } from '../../data/BookData';
import { useLibraryDataContext } from '../contextHooks/useLibraryDataContext';
import { postNewCategory, updateExistingCategory } from '../../apis/categoryApi';
import { postNewAuthor } from '../../apis/authorApi';


//get strings of the categories
export const getStringCategories = (categories: ICategory[]) => {
  let categoryNames = categories.map((item: ICategory) => {
    return item.name;
  });
  return categoryNames;
};

export const getICategories = (categories:string[],allCategories:ICategory[]) => {
  let ogCategories: ICategory[] = allCategories.filter((item) => {
    return categories.includes(item.name);
  });
  return ogCategories
}

export const useCreateAndUpdateForm = (error: boolean, setError: Function, message: string, setMessage: Function, success: boolean, setSuccess: Function) => {
  //Hooks & Contexts

  const {bookTrigger,categoryTrigger,authorTrigger,dispatch} = useLibraryDataContext();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const processResult = (result: ApiResult) => {
    //Step 1 -- If there is a user based error
    if (result.message && !result.response) {
      setSuccess(true);
      setMessage(result.message);
      return true;
    }
    else if (result.response!.status === 400) {
      if (result.response!.data!.errors) {
        let errors: string = "";
        result.response!.data!.errors.forEach((error: any) => {
          errors = errors + '\n' + error.msg;
        })
        setMessage(errors);
      }
      else if(result!.response!.data!.error){
        setMessage(result!.response!.data!.error);
      }
      else{
        setMessage(result.message);
      }
      setError(true);
      return false;
    }
    else if (result!.response!.status === 500) {
      setError(true);
      setMessage(result!.response!.data!.error);
      return false;
    }
  }

  /**
   * Functions that are used for Data Addition
   */
  const createBook = async (bookName: string, author: string, selectedCategories: string[], selectedStatus: string) => {
    //Step 0 -- Reset
    setMessage("");
    setError(false);
    setSuccess(false);
    //Step 1 -- The Request Body Checks
    const requestBody = {
      bookName: bookName,
      author: author,
      bookCategories: selectedCategories,
      bookStatus: selectedStatus
    }
    const result = await postNewBook(requestBody);
    const check = processResult(result);
    if(check){
      dispatch({ type: 'TRIGGER_BOOKS', payload: !bookTrigger });
    }
  };

  const updateBook = async (id: string, bookName: string, author: string, selectedCategories: string[], selectedStatus: string) => {
    //Step 0 -- Reset
    setMessage("");
    setError(false);
    setSuccess(false);
    //Step 1 -- The Request Body Checks
    const requestBody = {
      bookName: bookName,
      author: author,
      bookCategories: selectedCategories,
      bookStatus: selectedStatus
    }
    const result = await updateABook(id, requestBody);
    //Step 1 -- If there is a user based error
    const check = processResult(result);
    if(check){
      dispatch({ type: 'TRIGGER_BOOKS', payload: !bookTrigger });
    }
  };

  const createCategory =async (name:string,info:string) => {
    setMessage("");
    setError(false);
    setSuccess(false);
    const requestBody = {
      name: name,
      info:info
    }
    const result = await postNewCategory(requestBody);
    const check = processResult(result);
    if(check){
      dispatch({ type: 'TRIGGER_CATEGORIES', payload: !categoryTrigger });
    }
  }

  const updateCategory = async (id:number,name:string,info:string) => {
    //Step 0 -- Reset
    setMessage("");
    setError(false);
    setSuccess(false);
    //Step 1 -- The Request Body Checks
    const requestBody = {
      name:name,
      info:info
    }
    const result = await updateExistingCategory(id,requestBody);
    const check = processResult(result);
    if(check){
      dispatch({ type: 'TRIGGER_CATEGORIES', payload: !categoryTrigger });
    }
  }


  const createAuthor = async (name:string,info:string) => {
    setMessage("");
    setError(false);
    setSuccess(false);
    const requestBody = {
      name: name,
      info:info
    }
    const result = await postNewAuthor(requestBody);
    const check = processResult(result);
    if(check){
      dispatch({ type: 'TRIGGER_AUTHORS', payload: !authorTrigger });
    }
  }

  return { error, success, message, createBook, updateBook, createCategory, updateCategory, createAuthor };
}

