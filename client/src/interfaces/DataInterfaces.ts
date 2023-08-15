export interface ICategory{
    id:number;
    name:string;
}

export interface IBook {
    id:number;
    name:string;
    author:string;
    entered?: string;
    category:string[];
    status:string;
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
