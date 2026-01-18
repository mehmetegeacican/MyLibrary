import { IBook, ICategory, IAuthor } from "./DataInterfaces";

export interface FormInterface {
    format: string;
    data?: IBook | ICategory | IAuthor;
    handleClose?: () => void;
}

export type langInterface = {
    code: string;
    label: string;
}