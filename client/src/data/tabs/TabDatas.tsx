import { TabInterface } from "../../interfaces/TabInterfaces";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BookIcon from '@mui/icons-material/Book';
import { Typography } from "@mui/material";
import BookAccordions, { AuthorAccordionDatas, AuthorAccordions, CategoryAccordions } from "../accordions/AccordionDatas";
import Shelflist from "../../components/shelfList/shelfList";


/**
 * Book Tabs for the Book Page
 */
export const BookTabs: TabInterface[] = [
    { icon: (<BackupTableIcon />), label: "Table View" },
    { icon: (<BookIcon />), label: "Shelf View" },
];

/**
 * Tab Contents for the Book Page
 */
export const BookTabContents: JSX.Element[] = [
    (<Typography component={'span'} variant={'body2'}> <BookAccordions /> </Typography>),
    (<Typography component={'span'} variant={'body2'}> <Shelflist/> </Typography>)
];

/**
 * Tab Buttons for Authors
 */
export const AuthorTabs: TabInterface[] = [
    { icon: (<BackupTableIcon />), label: "Table View" },
    //{ icon: (<BookIcon />), label: "Card View" },
]

/**
 * Tab Contents for the Authors Page
 */
export const AuthorTabContents: JSX.Element[] = [
    (<Typography component={'span'} variant={'body2'}> <AuthorAccordions/> </Typography>),
    (<Typography component={'span'} variant={'body2'}> CARD </Typography>)
];

/**
 * Tab Buttons for Categories
 */
export const CategoryTabs: TabInterface[] = [
    { icon: (<BackupTableIcon />), label: "Table View" },
    //{ icon: (<BookIcon />), label: "Card View" },
]

/**
 * Tab Contents for the Categories Page
 */
export const CategoryTabContents: JSX.Element[] = [
    (<Typography component={'span'} variant={'body2'}> <CategoryAccordions/> </Typography>),
    (<Typography component={'span'} variant={'body2'}> CARD </Typography>)
];