export interface ICategory{
    id:number;
    name:string;
}

export interface IBook {
    id:number;
    name:string;
    author:string;
    categories:ICategory[];
    status:string;
}