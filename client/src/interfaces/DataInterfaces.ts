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
  description:string;
  entered?: string;
  category: string[];
  status: string;
  language?:string;
  imagePath?: string;
  liked?:string;
  influence?:string;
}

export interface INote {
  id: number;
  userId: number;
  title: string;
  content?: string;
  imagePath?:string;
  createdAt: Date;
  updatedAt: Date;
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
  id:number;
  email:string;
  token:string;
  imagePath?: string;
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

export interface IAvgAuthor {
  author_name: string;
  avg_liked:number | null;
}
