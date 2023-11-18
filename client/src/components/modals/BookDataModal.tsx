import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Chip } from '@mui/material'
import { IAuthor, IBook } from '../../interfaces/DataInterfaces';
import { useEffect } from 'react';


interface BookDataInterface {
    open:boolean;
    handleClose: () => void;
    data : IBook;
    type: string;
}

export default function BookDataModal({open,handleClose,type,data}:BookDataInterface) {

    useEffect(() => {
        console.log("Data", data);
    },[open])
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Info
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {type === "Author" && data && (
                        data.authors.map((author:string) => (
                            <Chip label={author} color='info'/>
                        ))
                    )}
                    {type === "Category" && data && (
                        data.category.map((cat:string,index:number) => (
                            <Chip key={index} label={cat} color='info'/>
                        ))
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
