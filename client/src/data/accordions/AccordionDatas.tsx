import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/tables/DataTable";
import { AccordionData } from "../../interfaces/AccordionInterfaces";
import { AuthorTableHeader, BookTableHeader, CategoryTableHeader } from "../tables/TableDatas";
import { fetchAllBooks } from "../../apis/bookApi";
import LibraryAccordion from "../../components/accordions/LibraryAccordion";
import { BookForm } from "../forms/CreateAndUpdateForms";
import { useLibraryDataContext } from "../../hooks/contextHooks/useLibraryDataContext";
import { ICategory } from "../../interfaces/DataInterfaces";
import { defaultBookCategories } from "../BookData";

/**
 * Accordion Datas for Book Page
 */
export const BookAccordionDatas: AccordionData[] = [
    { title: "View Books", info: "View the Books in Table Format", data: (<DataTable headers={BookTableHeader} tableDatas={[]} />) },
    { title: "Add Book", info: "Add a new Book", data: (<BookForm format={"create"} />) }
]

/**
 * Accordion for Book Page
 * @returns Rendered Accordion designed for Books 
 */
export default function BookAccordions() {
    //Hooks & Contexts 
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const { bookTrigger, books, dispatch } = useLibraryDataContext();

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    //UseCallBack 
    const fetchData = useCallback(async () => {
        const res = await fetchAllBooks();
        dispatch({ type: 'GET_BOOKS', payload: res });
    }, [bookTrigger]);

    //UseEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    BookAccordionDatas[0].data = (<DataTable headers={BookTableHeader} tableDatas={books} />);
    BookAccordionDatas[1].data = (<BookForm format={"create"} />)


    //Render
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={BookAccordionDatas} />
    )
}


/**
 * Accordion Datas for Authors
 */
export const AuthorAccordionDatas: AccordionData[] = [
    { title: "View Authors", info: "View the Authors in Table Format", data: (<DataTable headers={AuthorTableHeader} tableDatas={[]} />) },
]

/**
 * 
 * @returns {*JSX} The JSX Content of the Author Accordions
 */
export const AuthorAccordions = () => {
    //Hooks
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [authors, setAuthors] = React.useState<any>([]);
    //Handlers
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={AuthorAccordionDatas} />
    )
}

/**
 * Accordion Datas for Categories
 */
export const CategoryAccordionDatas: AccordionData[] = [
    { title: "View Categories", info: "View the Categories in Table Format", data: (<DataTable headers={AuthorTableHeader} tableDatas={[]} />) },
];

export const CategoryAccordions = () => {
    //Hooks
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [categories, setCategories] = React.useState<ICategory[]>(defaultBookCategories);
    //Handlers
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
        CategoryAccordionDatas[0].data = (<DataTable headers={CategoryTableHeader} tableDatas={[]} />);
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={CategoryAccordionDatas} />
    )
}