

import { postNewBook, updateABook } from '../../apis/bookApi';
import { useEffect, useMemo, useState } from 'react';
import { ApiResult, IAuthor, ICategory } from '../../interfaces/DataInterfaces';
import { useLibraryDataContext } from '../contextHooks/useLibraryDataContext';
import { postNewCategory, updateExistingCategory } from '../../apis/categoryApi';
import { postNewAuthor, updateAnAuthor } from '../../apis/authorApi';
import { useAuthContext } from '../contextHooks/useAuthContext';
import { postNewNote, updateExistingNote } from '../../apis/noteApis';


//get strings of the categories
export const getStringCategories = (categories: ICategory[]) => {
  let categoryNames = categories.map((item: ICategory) => {
    return item.name;
  });
  return categoryNames;
};

export const getICategories = (categories: string[], allCategories: ICategory[]) => {
  let ogCategories: ICategory[] = allCategories.filter((item) => {
    return categories.includes(item.name);
  });
  return ogCategories
};

export const getStringAuthors = (authors: IAuthor[]) => {
  let authorNames = authors.map((item: IAuthor) => {
    return item.authorName;
  });
  return authorNames;
};

export const getIAuthors = (authors: string[], allAuthors: IAuthor[]) => {
  let ogAuthors: IAuthor[] = allAuthors.filter((item) => {
    return authors.includes(item.authorName);
  });
  return ogAuthors
};

export const useCreateAndUpdateForm = (error: boolean, setError: Function, message: string, setMessage: Function, success: boolean, setSuccess: Function) => {
  //Hooks & Contexts
  const { user } = useAuthContext();
  const { bookTrigger, categoryTrigger, authorTrigger, noteTrigger, dispatch } = useLibraryDataContext();


  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const authId = useMemo(() => {
    if (user) {
      return user.id
    }
    else {
      return 0;
    }
  }, [user])

  const processResult = (result: ApiResult) => {
    //Step 1 -- If there is a user based error
    if (result.message && !result.response) {
      setSuccess(true);
      setMessage(result.message);
      return true;
    }
    else if (result && !result.response) {
      setSuccess(true);
      setMessage("Successfully saved");
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
      else if (result!.response!.data!.error) {
        setMessage(result!.response!.data!.error);
      }
      else {
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
  const createBook = async (bookName: string, desc: string, selectedCategories: string[], selectedStatus: string, selectedAuthors: string[], imagePath?:string, language?:string, liked?:number) => {
    //Step 0 -- Reset
    setMessage("");
    setError(false);
    setSuccess(false);
    //Step 1 -- The Request Body Checks
    const requestBody = {
      bookName: bookName,
      desc: desc,
      bookAuthors: selectedAuthors,
      bookCategories: selectedCategories,
      bookStatus: selectedStatus,
      userId: authId,
      imagePath:imagePath,
      language:language || "",
      liked: liked || null
    }
    if (user) {
      const result = await postNewBook(requestBody, user.token);
      const check = processResult(result);
      if (check) {
        dispatch({ type: 'TRIGGER_BOOKS', payload: !bookTrigger });
      }
    }
  };

  const updateBook = async (id: string, bookName: string, desc: string, selectedCategories: string[], selectedStatus: string, selectedAuthors: string[], imagePath?:string,language?:string,liked?:number) => {
    //Step 0 -- Reset
    setMessage("");
    setError(false);
    setSuccess(false);
    //Step 1 -- The Request Body Checks
    const requestBody = {
      bookName: bookName,
      desc: desc,
      bookAuthors: selectedAuthors,
      bookCategories: selectedCategories,
      bookStatus: selectedStatus,
      userId: user!.id,
      imagePath:imagePath,
      language:language || "",
      liked: liked || null
    }

    const result = await updateABook(id, requestBody, user!.token);
    //Step 1 -- If there is a user based error
    const check = processResult(result);
    if (check) {
      dispatch({ type: 'TRIGGER_BOOKS', payload: !bookTrigger });
    }

  };

  const createCategory = async (name: string, info: string) => {
    setMessage("");
    setError(false);
    setSuccess(false);
    const requestBody = {
      name: name,
      info: info,
      user_id: user!.id
    }
    const result = await postNewCategory(requestBody, user!.token);
    const check = processResult(result);
    if (check && result.status !== 500) {
      dispatch({ type: 'TRIGGER_CATEGORIES', payload: !categoryTrigger });
    }
  }

  const updateCategory = async (id: number, name: string, info: string) => {
    //Step 0 -- Reset
    setMessage("");
    setError(false);
    setSuccess(false);
    //Step 1 -- The Request Body Checks
    const requestBody = {
      name: name,
      info: info
    }
    const result = await updateExistingCategory(id, requestBody, user!.token);
    const check = processResult(result);
    if (check && result.status !== 500) {
      dispatch({ type: 'TRIGGER_CATEGORIES', payload: !categoryTrigger });
    }
  }


  const createAuthor = async (name: string, info: string) => {
    setMessage("");
    setError(false);
    setSuccess(false);
    const requestBody = {
      name: name,
      info: info,
      userId: user!.id // This might be problematic -- Add a check here
    }
    const result = await postNewAuthor(requestBody, user!.token);
    const check = processResult(result);
    if (check) {
      dispatch({ type: 'TRIGGER_AUTHORS', payload: !authorTrigger });
    }
  }

  const updateAuthor = async (id: number, name: string, info: string) => {
    //Step 0 -- Reset
    setMessage("");
    setError(false);
    setSuccess(false);
    //Step 1 -- The Request Body Checks
    const requestBody = {
      name: name,
      info: info,
      userId: user!.id // This might be problematic -- Add a check here
    }
    const result = await updateAnAuthor(id, requestBody, user!.token);
    const check = processResult(result);
    if (check) {
      dispatch({ type: 'TRIGGER_AUTHORS', payload: !authorTrigger });
    }
  }

  const createNote = async (title: string, content: string, imagePath? : string) => {
    setMessage("");
    setError(false);
    setSuccess(false);
    const requestBody = {
      title: title,
      content: content,
      userId: user!.id, // This might be problematic -- Add a check here
      imagePath:imagePath
    }
    const result = await postNewNote(requestBody, user!.token);
    const check = processResult(result);
    if (check) {
      dispatch({ type: 'TRIGGER_NOTES', payload: !noteTrigger });
    }
  }

  const updateNote = async (id: number, title: string, content: string,imagePath?:string) => {
      setMessage("");
      setError(false);
      setSuccess(false);
      const requestBody = {
        title: title,
        content: content,
        userId: user!.id, // This might be problematic -- Add a check here
        imagePath:imagePath ?? ""
      }
      const result = await updateExistingNote(id.toString(),requestBody,user!.token);
      const check = processResult(result);
      if (check) {
        dispatch({ type: 'TRIGGER_NOTES', payload: !noteTrigger });
      }
  }

  return { error, success, message, createBook, updateBook, createCategory, updateCategory, createAuthor, updateAuthor, createNote, updateNote };
}

