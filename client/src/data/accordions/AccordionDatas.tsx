import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/tables/DataTable";
import { AccordionData } from "../../interfaces/AccordionInterfaces";
import { AuthorTableHeader, BookTableHeader, CategoryTableHeader } from "../tables/TableDatas";
import { fetchAllBooks } from "../../apis/bookApi";
import LibraryAccordion from "../../components/accordions/LibraryAccordion";
import { AuthorForm, BookForm, CategoryForm } from "../forms/CreateAndUpdateForms";
import { useLibraryDataContext } from "../../hooks/contextHooks/useLibraryDataContext";
import { fetchAllCategories } from "../../apis/categoryApi";
import { fetchAllAuthors } from "../../apis/authorApi";
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";

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
    const {user} = useAuthContext();

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    //UseCallBack 
    const fetchData = useCallback(async () => {
        if(user){
            const res = await fetchAllBooks(user.id,user.token);
            dispatch({ type: 'GET_BOOKS', payload: res });
        } 
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
    { title: "Add New Author", info: "Add new Author to the DB", data: (<AuthorForm format={"create"}  />) },
]

/**
 * 
 * @returns {*JSX} The JSX Content of the Author Accordions
 */
export const AuthorAccordions = () => {
    //Hooks
    const {user} = useAuthContext();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const {authors,authorTrigger,dispatch} =useLibraryDataContext();
    //Use Callback
    const fetchData = useCallback(async() => {
        if(user){
            const res = await fetchAllAuthors(user.id);
            dispatch({type:'GET_AUTHORS',payload:res!});
        }
    },[authorTrigger]);
    //Effect
    useEffect(() => {
        fetchData();
    },[fetchData]);


    AuthorAccordionDatas[0].data = (<DataTable headers={AuthorTableHeader} tableDatas={authors} />)
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
    { title: "Add Category", info: "Add new Category to the System", data: (<CategoryForm format={"create"}/>) },
];

export const CategoryAccordions = () => {
    //Hooks
    const {user} = useAuthContext();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const {categories} = useLibraryDataContext();
    const { categoryTrigger, dispatch} = useLibraryDataContext();

    //callbacx
    //UseCallBack 
    const fetchData = useCallback(async () => {
        if(user){
            const res = await fetchAllCategories(user.id);
            dispatch({ type: 'GET_CATEGORIES', payload: res });   
        }
    }, [categoryTrigger]);

    useEffect(() => {
        fetchData();
    },[fetchData]);

    //Handlers
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
        CategoryAccordionDatas[0].data = (<DataTable headers={CategoryTableHeader} tableDatas={categories} />);
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={CategoryAccordionDatas} />
    )
}