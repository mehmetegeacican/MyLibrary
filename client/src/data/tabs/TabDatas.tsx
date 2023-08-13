import { TabInterface } from "../../interfaces/TabInterfaces";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BookIcon from '@mui/icons-material/Book';
import { Typography } from "@mui/material";
import BookAccordions from "../accordions/AccordionDatas";


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
