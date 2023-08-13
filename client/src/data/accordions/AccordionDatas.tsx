import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/tables/DataTable";
import { AccordionData } from "../../interfaces/AccordionInterfaces";
import { BookTableHeader } from "../tables/TableDatas";
import { fetchAllBooks } from "../../apis/bookApi";
import LibraryAccordion from "../../components/accordions/LibraryAccordion";
import { CreateBookForm } from "../forms/CreateForms";

/**
 * Accordion Datas for Book Page
 */
export const BookAccordionDatas: AccordionData[] = [
    { title: "View Books", info: "View the Books in Table Format", data: (<DataTable headers={BookTableHeader} tableDatas={[]} />) },
    { title: "Add Book", info: "Add a new Book", data: (<CreateBookForm setTrigger = {() => console.log("Trigger")} />) }
]

/**
 * Accordion for Book Page
 * @returns Rendered Accordion designed for Books 
 */
export default function BookAccordions() {
    //Hooks
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [books, setBooks] = React.useState<any>([]);
    const [trigger,setTrigger] = React.useState<boolean>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    //UseCallBack 
    const fetchData = useCallback(async () => {
        const res = await fetchAllBooks();
        setBooks(res);
    }, [trigger]); // A Context can be better maybe


    //UseEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    BookAccordionDatas[0].data = (<DataTable headers={BookTableHeader} tableDatas={books} />);
    BookAccordionDatas[1].data = (<CreateBookForm setTrigger={() => setTrigger(!trigger)}/>)


    //Render
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={BookAccordionDatas} />
    )
}