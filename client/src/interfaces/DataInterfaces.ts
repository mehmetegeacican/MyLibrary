import { MIND_MAP_EDGE_STROKE_STYLES } from "../enums/enums";

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
  uuid?: string;
}

export interface INote {
  id: string;
  userId: number;
  title: string;
  content?: string;
  imagePath?:string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IAnnotationBook {
  uuid: string;
  name: string;
  authors: string[];
  imagePath?: string;
}

export interface IAnnotation {
  id: string;
  userId: string;
  bookId: string;
  annotation: string | null;
  comment: string | null;
  pageNumber: number;
  createdAt: Date;
  updatedat: Date;
  deletedAt: Date | null;
  version: number;
  book: IAnnotationBook;
}


export interface IMindMap{
  _id:string;
  title:string;
  nodes:IMindMapNode[],
  edges:IMindMapEdge[]
  createdAt?:Date;
  updatedAt?:Date;
}

export interface IMindMapNode {
  _id:string;
  position: {
    x:number;
    y:number;
  }
  type:string;
  data: {
    label:string;
    information:string;
  }
};
export interface IMindMapEdge {
  _id:string,
  source:string;
  target:string;
  data?: {
    strokeStyle?: MIND_MAP_EDGE_STROKE_STYLES,
    color?:string
  };
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

export interface IAvgAuthorStat {
  author_name: string;
  avg_liked:number | null;
}

export interface IAvgCategoryStat {
  category_name: string;
  avg_liked:number | null;
}