
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BookIcon from '@mui/icons-material/Book';
import { Box, Button, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { TabInterface } from '../interfaces/TabInterfaces';
import LibraryAccordion from '../components/accordions/LibraryAccordion';
import { AccordionData } from '../interfaces/AccordionInterfaces';
import DataTable from '../components/tables/DataTable';
import { fetchAllBooks } from '../apis/bookApi';
import StringValueField from '../components/forms/StringValueField';
import MultipleSelectionAutocomplete from '../components/forms/MultipleSelectionAutocomplete';
import { ICategory } from '../interfaces/DataInterfaces';
import { BookTableHeader } from './tables/TableDatas';


/**
 * This Section includes the React Components Specific to Books Section,
 * which the Books.tsx page uses
 */

/**
 * Book Tabs for the Book Page
 */
export const BookTabs: TabInterface[] = [
    { icon: (<BackupTableIcon />), label: "Table View" },
    { icon: (<BookIcon />), label: "Card View" },
];
/**
 * Tab Contents for the Book Page
 */
export const BookTabContents: JSX.Element[] = [
    (<Typography component={'span'} variant={'body2'}> <BookAccordions /> </Typography>),
    (<Typography component={'span'} variant={'body2'}> CARD </Typography>)
];

/**
 * Accordion Datas for Book Page
 */
export const BookAccordionDatas: AccordionData[] = [
    { title: "View Books", info: "View the Books in Table Format", data: (<DataTable headers={BookTableHeader} tableDatas={[]} />) },
    { title: "Add Book", info: "Add a new Book", data: (<CreateBookForm />) }
]


export const defaultBookCategories = [
    { id: 1, name: "Psychology" },
    { id: 2, name: "Sociology" },
    { id: 3, name: "Anthropology" },
];

/**
 * Create Form for Create Book
 * @returns rendered create book form component
 */
export function CreateBookForm() {
    // Variables -- Hooks 
    const [bookName, setBookName] = React.useState<string>('White Fang');
    const [author, setAuthor] = React.useState<string>('Jack London');
    const [selectedCategories, setSelectedCategories] = React.useState<ICategory[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>("Reading");


    return (
        <Box
            component="form"
        >
            <Container>
                <Stack spacing={2} alignContent={'center'}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <StringValueField label='Please Enter the Book name' data={bookName} setter={setBookName} />
                        <StringValueField label='Please Enter the Author name' data={author} setter={setAuthor} />
                    </Stack>

                    <MultipleSelectionAutocomplete
                        label="Select Categories"
                        placeholder='categories'
                        categories={defaultBookCategories}
                        selected={selectedCategories}
                        setSelected={setSelectedCategories}
                    />
                    <Divider />
                    <Stack direction={'row'} spacing={2} alignContent={'center'}>
                        <Chip clickable onClick={() => setSelectedStatus("Red")} label="Red" color="error" variant={selectedStatus === "Red" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Reading")} label="Reading" color="warning" variant={selectedStatus === "Reading" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Will Reading")} label="Will Read" color="success" variant={selectedStatus === "Will Reading" ? "filled" : "outlined"} />
                    </Stack>
                    <Divider />
                    <Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={() => console.log("Clicked")}> Add </Button>
                </Stack>
            </Container>
        </Box>

    )
};

/**
 * Accordion for Book Page
 * @returns Rendered Accordion designed for Books 
 */
export default function BookAccordions() {
    //Hooks
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [books, setBooks] = React.useState<any>([]);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    //UseCallBack 
    const fetchData = useCallback(async () => {
        const res = await fetchAllBooks();;
        setBooks(res);
    }, []);

    //UseEffect
    useEffect(() => {
        fetchData();
    }, []);

    BookAccordionDatas[0].data = (<DataTable headers={BookTableHeader} tableDatas={books} />);

    //Render
    return (
        <LibraryAccordion expanded={expanded} handleChange={handleChange} accordions={BookAccordionDatas} />
    )
}