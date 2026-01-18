import React, { useCallback, useEffect } from "react";
import { useAuthContext, useLibraryDataContext } from "../../../../hooks/contextHooks";
import { fetchAllBooks } from "../../../../apis/bookApi";
import DataTable from "../../../../components/tables/DataTable";
import { BookForm } from "../../../../data/forms/CreateAndUpdateForms";
import { BookTableHeader } from "../../../../data/tables/TableDatas";
import { BookAccordionDatas } from "../../../../data/accordions/AccordionDatas";
import LibraryAccordion from "../../../../components/accordions/LibraryAccordion";

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
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
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