export interface ICategory {
  id: number;
  name: string;
  info: string;
}

export interface IAuthor {
  id:number;
  authorName:string;
  authorDetails:string;
  books: IBook[];
}

export interface IBook {
  id: number;
  name: string;
  authors: string[];
  desc:string;
  entered?: string;
  category: string[];
  status: string;
}

export type ApiResult = {
  response?: {
    status?: number;
    data?: {
      errors?: Array<{ msg: string }>;
      error?: string;
    };
  };
  message?: string;
};


export interface IUser {
  email:string;
  token:string;
}


export interface IBookByAuthorStat {
  author: string;
  total: number;
}

export interface IBookByStatusStat {
  status: string;
  total:number;
}

export interface IBookByCategoryStat {
  category_name: string;
  category_count: number;
}
