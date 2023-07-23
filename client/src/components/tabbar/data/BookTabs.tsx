
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BookIcon from '@mui/icons-material/Book';
import { Typography } from '@mui/material';
import { TabInterface } from '../interfaces/TabInterfaces';


export const BookTabs:TabInterface[] = [
    {icon : (<BackupTableIcon />), label: "Table View" },
    {icon : (<BookIcon />), label: "Card View" },
];

export const BookTabContents:JSX.Element[] = [
    (<Typography> TABLE</Typography>),
    (<Typography> CARD </Typography>)
];