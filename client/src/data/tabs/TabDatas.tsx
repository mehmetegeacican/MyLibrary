import { TabInterface } from "../../interfaces/TabInterfaces";
import {BackupTable, Book} from '@mui/icons-material';
import { Typography } from "@mui/material";
import Shelflist from "../../components/shelfList/shelfList";
import {
    BookAccordions
} from "../../pages/BooksPage/components";
import {
    AuthorAccordions
} from "../../pages/AuthorsPage/components";

import {
    CategoryAccordions
} from "../../pages/CategoriesPage/components"


/**
 * Book Tabs for the Book Page
 */
export const BookTabs: TabInterface[] = [
    { icon: (<BackupTable />), label: "Table View" },
    { icon: (<Book />), label: "Shelf View" },
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
    { icon: (<BackupTable />), label: "Table View" },
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
    { icon: (<BackupTable />), label: "Table View" },
    //{ icon: (<BookIcon />), label: "Card View" },
]

/**
 * Tab Contents for the Categories Page
 */
export const CategoryTabContents: JSX.Element[] = [
    (<Typography component={'span'} variant={'body2'}> <CategoryAccordions/> </Typography>),
    (<Typography component={'span'} variant={'body2'}> CARD </Typography>)
];