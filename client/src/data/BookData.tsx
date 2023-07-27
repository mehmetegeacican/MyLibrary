
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BookIcon from '@mui/icons-material/Book';
import { Box, Button, Checkbox, Chip, Container, Divider, FormControlLabel, FormGroup, Paper, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { TabInterface } from '../interfaces/TabInterfaces';
import LibraryAccordion from '../components/accordions/LibraryAccordion';
import { AccordionData } from '../interfaces/AccordionInterfaces';
import DataTable from '../components/tables/DataTable';
import { fetchAllBooks } from '../apis/bookApi';
import StringValueField from '../components/forms/StringValueField';
import MultipleSelectionAutocomplete from '../components/forms/MultipleSelectionAutocomplete';
import { ICategory } from '../interfaces/DataInterfaces';

export const BookTabs: TabInterface[] = [
    { icon: (<BackupTableIcon />), label: "Table View" },
    { icon: (<BookIcon />), label: "Card View" },
];

export const BookTabContents: JSX.Element[] = [
    (<Typography component={'span'} variant={'body2'}> <BookAccordions /> </Typography>),
    (<Typography component={'span'} variant={'body2'}> CARD </Typography>)
];


export const BookTableHeader: string[] = [
    "Book ID",
    "Name",
    "Author",
    "Category",
    "Status",
    "Entered to the system",
    "Notes"
];

export const BookDataExamples: any = [
    { id: 1, name: "Book 1", author: "Author 1", category: "View", Status: "Red", entered: "21.07.2023", notes: "view" },
    { id: 2, name: "Book 2", author: "Author 1", category: "View", Status: "Reading", entered: "21.07.2023", notes: "view" },
    { id: 3, name: "Book 3", author: "Author 1", category: "View", Status: "Will Read", entered: "21.07.2023", notes: "view" },
    { id: 4, name: "Book 4", author: "Author 1", category: "View", Status: "Reading", entered: "21.07.2023", notes: "view" },
    { id: 5, name: "Book 5", author: "Author 1", category: "View", Status: "Will Read", entered: "21.07.2023", notes: "view" },
    { id: 6, name: "Book 6", author: "Author 1", category: "View", Status: "Will Read", entered: "21.07.2023", notes: "view" },
    { id: 7, name: "Book 7", author: "Author 2", category: "View", Status: "Will Read", entered: "21.07.2023", notes: "view" },
    { id: 8, name: "Book 8", author: "Author 2", category: "View", Status: "Will Read", entered: "21.07.2023", notes: "view" },
    { id: 9, name: "Book 7", author: "Author 2", category: "View", Status: "Red", entered: "21.07.2023", notes: "view" },
    { id: 10, name: "Book 8", author: "Author 2", category: "View", Status: "Red", entered: "21.07.2023", notes: "view" },

]

export const BookAccordionDatas: AccordionData[] = [
    { title: "View Books", info: "View the Books in Table Format", data: (<DataTable headers={BookTableHeader} tableDatas={BookDataExamples} />) },
    { title: "Add Book", info: "Add a new Book", data: (<CreateBookForm />) }
]

export const defaultBookCategories = [
    { id: 1, name: "Psychology" },
    { id: 2, name: "Sociology" },
    { id: 3, name: "Anthropology" },
];

export function CreateBookForm() {
    // Variables -- Hooks 
    const [bookName, setBookName] = React.useState<string>('White Fang');
    const [author, setAuthor] = React.useState<string>('Jack London');
    const [selectedCategories,setSelectedCategories] = React.useState<ICategory[]>([]);
    const [selectedStatus,setSelectedStatus] = React.useState<string>("Reading");
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
                    <Divider/>
                    <Stack direction={'row'} spacing={2} alignContent={'center'}>
                        <Chip clickable onClick = {() => setSelectedStatus("Red")} label="Red" color="error" variant={selectedStatus === "Red" ? "filled" : "outlined" } />
                        <Chip clickable onClick = {() => setSelectedStatus("Reading")} label="Reading" color="warning" variant={selectedStatus === "Reading" ? "filled" : "outlined" }  />
                        <Chip clickable onClick = {() => setSelectedStatus("Will Reading")} label="Will Read" color="success" variant={selectedStatus === "Will Reading" ? "filled" : "outlined" }  />
                    </Stack>
                    <Divider/>
                    <Button sx={{alignItems:"center",width:300}} variant='outlined'> Add </Button> 
                </Stack>
            </Container>
        </Box>

    )
};

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