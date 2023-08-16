import { TableCell, Button, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { IBook } from "../../interfaces/DataInterfaces";
import StatusChip from "../chip/StatusChip";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Type guard function to check if an object is of type IBook
export function isIBook(value: any): value is IBook {
    return (
        typeof value === "object" &&
        "id" in value &&
        "name" in value &&
        "author" in value &&
        "category" in value &&
        "status" in value
    );
}


export const renderBookRow = (book: IBook, handleOpenUpdate: (book:IBook) => void, handleOpenDelete: (id:number) => void) => {
    return (
        <>
            <TableCell align='center'> {book.id}</TableCell>
            <TableCell align='center'> {book.name}</TableCell>
            <TableCell align='center'> {book.author}</TableCell>
            <TableCell align='center'> <Button color='primary'> View </Button> </TableCell>
            <TableCell align='center'><StatusChip statusLabel={book.status} /> </TableCell>
            <TableCell align='center'> {dayjs(book.entered).format('DD-MM-YYYY')}</TableCell>
            <TableCell align='center'> <Button color='primary'> View </Button></TableCell>
            <TableCell align='center'>
                <IconButton aria-label="edit" color='info' onClick={() => handleOpenUpdate(book)}>
                    <EditIcon />
                </IconButton>

            </TableCell>
            <TableCell align='center'>
                <IconButton aria-label="delete" color='error' onClick={() => handleOpenDelete(book.id)}>
                    <DeleteIcon />
                </IconButton>

            </TableCell>
        </>
    )
}