import React, { useCallback, useEffect } from "react";
import { useAuthContext, useLibraryDataContext } from "../../../../hooks/contextHooks";
import { fetchAllCategories } from "../../../../apis/categoryApi";
import { CategoryAccordionDatas } from "../../../../data/accordions/AccordionDatas";
import DataTable from "../../../../components/tables/DataTable";
import { CategoryTableHeader } from "../../../../data/tables/TableDatas";
import LibraryAccordion from "../../../../components/accordions/LibraryAccordion";

export default function CategoryAccordions() {
    //Hooks
    const { user } = useAuthContext();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const { categories, categoryTrigger, dispatch } = useLibraryDataContext();

    const fetchData = useCallback(async () => {
        if (user) {
            const res = await fetchAllCategories(user.id, user.token);
            dispatch({ type: 'GET_CATEGORIES', payload: res });
        }
    }, [categoryTrigger]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    //Handlers
    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    CategoryAccordionDatas[0].data = (<DataTable headers={CategoryTableHeader} tableDatas={categories} />);
    
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={CategoryAccordionDatas} />
    )
}