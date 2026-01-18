import DataTable from "../../components/tables/DataTable";
import { AccordionData } from "../../interfaces/AccordionInterfaces";
import { AuthorTableHeader, BookTableHeader } from "../tables/TableDatas";
import { AuthorForm, BookForm, CategoryForm } from "../forms/CreateAndUpdateForms";

/**
 * Accordion Datas for Book Page
 */
export const BookAccordionDatas: AccordionData[] = [
    { title: "View Books", info: "View the Books in Table Format", data: (<DataTable headers={BookTableHeader} tableDatas={[]} />) },
    { title: "Add Book", info: "Add a new Book", data: (<BookForm format={"create"} />) }
]

/**
 * Accordion Datas for Authors
 */
export const AuthorAccordionDatas: AccordionData[] = [
    { title: "View Authors", info: "View the Authors in Table Format", data: (<DataTable headers={AuthorTableHeader} tableDatas={[]} />) },
    { title: "Add New Author", info: "Add new Author to the DB", data: (<AuthorForm format={"create"}  />) },
]

/**
 * Accordion Datas for Categories
 */
export const CategoryAccordionDatas: AccordionData[] = [
    { title: "View Categories", info: "View the Categories in Table Format", data: (<DataTable headers={AuthorTableHeader} tableDatas={[]} />) },
    { title: "Add Category", info: "Add new Category to the System", data: (<CategoryForm format={"create"}/>) },
];