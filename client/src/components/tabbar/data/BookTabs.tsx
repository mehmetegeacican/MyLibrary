
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BookIcon from '@mui/icons-material/Book';
import { Typography } from '@mui/material';


export interface TabInterface {
    icon:JSX.Element;
    label: string;
}

export interface TabPanelInterface {
    value: number;
    items: JSX.Element[];
}

export const BookTabs:TabInterface[] = [
    {icon : (<BackupTableIcon />), label: "Table View" },
    {icon : (<BookIcon />), label: "Card View" },
];

export const BookTabContents:JSX.Element[] = [
    (<Typography> TABLE</Typography>),
    (<Typography> CARD </Typography>)
];