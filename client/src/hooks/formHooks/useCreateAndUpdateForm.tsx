

import { postNewBook, updateABook } from '../../apis/bookApi';
import { useEffect } from 'react';
import { ApiResult, ICategory } from '../../interfaces/DataInterfaces';
import { defaultBookCategories } from '../../data/BookData';

//get strings of the categories
export const getStringCategories = (categories: ICategory[]) => {
  let categoryNames = categories.map((item: ICategory) => {
    return item.name;
  });
  return categoryNames;
};

export const getICategories = (categories:string[]) => {
  let ogCategories: ICategory[] = defaultBookCategories.filter((item) => {
    return categories.includes(item.name);
  });
  return ogCategories
}

export const useCreateAndUpdateForm = (error: boolean, setError: Function, message: string, setMessage: Function, success: boolean, setSuccess: Function) => {
  //Hooks
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
    }
    else if (result.response!.status === 400) {
      if (result.response!.data!.errors) {
        let errors: string = "";
        result.response!.data!.errors.forEach((error: any) => {
          errors = errors + '\n' + error.msg;
        })
        setMessage(errors);
      }
      else {
        setMessage(result!.response!.data!.error);
      }
      setError(true);
    }
    else if (result!.response!.status === 500) {
      setError(true);
      setMessage(result!.response!.data!.error);
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
    processResult(result);
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
    processResult(result);
  };

  return { error, success, message, createBook, updateBook };
}

