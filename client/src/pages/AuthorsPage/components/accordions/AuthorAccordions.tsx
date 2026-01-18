import React, { useCallback, useEffect } from "react";
import { useAuthContext, useLibraryDataContext } from "../../../../hooks/contextHooks";
import { fetchAllAuthors } from "../../../../apis/authorApi";
import { AuthorAccordionDatas } from "../../../../data/accordions/AccordionDatas";
import DataTable from "../../../../components/tables/DataTable";
import { AuthorTableHeader } from "../../../../data/tables/TableDatas";
import LibraryAccordion from "../../../../components/accordions/LibraryAccordion";

/**
 * 
 * @returns {*JSX} The JSX Content of the Author Accordions
 */
export default function AuthorAccordions() {
    //Hooks
    const { user } = useAuthContext();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const { authors, authorTrigger, dispatch } = useLibraryDataContext();

    //Use Callback
    const fetchData = useCallback(async () => {
        if (user) {
            const res = await fetchAllAuthors(user.id, user.token);
            dispatch({ type: 'GET_AUTHORS', payload: res! });
        }
    }, [authorTrigger]);

    //Effect
    useEffect(() => {
        fetchData();
    }, [fetchData]);


    AuthorAccordionDatas[0].data = (<DataTable headers={AuthorTableHeader} tableDatas={authors} />)
    //Handlers
    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={AuthorAccordionDatas} />
    )
}