
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BookIcon from '@mui/icons-material/Book';
import { Typography } from '@mui/material';
import { TabInterface } from '../../../interfaces/TabInterfaces';
import React from 'react';
import LibraryAccordion from '../../accordions/LibraryAccordion';
import { AccordionData } from '../../../interfaces/AccordionInterfaces';
import DataTable from '../../tables/DataTable';


export const BookTabs:TabInterface[] = [
    {icon : (<BackupTableIcon />), label: "Table View" },
    {icon : (<BookIcon />), label: "Card View" },
];

export const BookTabContents:JSX.Element[] = [
    (<Typography component={'span'} variant={'body2'}> <BookAccordions/> </Typography>),
    (<Typography component={'span'} variant={'body2'}> CARD </Typography>)
];


export const BookTableHeader:string[] = [
    "Book ID",
    "Name",
    "Author",
    "Category",
    "Status",
    "Entered to the system",
    "Notes"
];

export const BookDataExamples: any = [
    {id:1,name:"Book 1",author:"Author 1",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:2,name:"Book 2",author:"Author 1",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:3,name:"Book 3",author:"Author 1",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:4,name:"Book 4",author:"Author 1",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:5,name:"Book 5",author:"Author 1",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:6,name:"Book 6",author:"Author 1",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:7,name:"Book 7",author:"Author 2",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:8,name:"Book 8",author:"Author 2",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:9,name:"Book 7",author:"Author 2",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},
    {id:10,name:"Book 8",author:"Author 2",category:"View",Status:"Red",entered:"21.07.2023",notes:"view"},

]

export const BookAccordionDatas:AccordionData[] = [
    {title: "View Books", info: "View the Books in Table Format", data: (<DataTable headers={BookTableHeader} tableDatas={BookDataExamples}/>)},
    {title: "Add Book", info: "Add a new Book", data: (<Typography component={'span'} variant={'body2'} > Create Form is Here</Typography>)}
]




export default function BookAccordions() {
    //Hooks
    const [expanded,setExpanded] = React.useState<string | false>(false);

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    //Render
    return (
        <LibraryAccordion expanded = {expanded} handleChange = {handleChange} accordions= {BookAccordionDatas}/>
    )
}