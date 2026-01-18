import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Stack, Divider } from '@mui/material'
import {  IBook } from '../../interfaces/DataInterfaces';
import { Fragment } from 'react';


interface BookDataInterface {
    open: boolean;
    handleClose: () => void;
    data: IBook;
    type: string;
}

export default function BookDataModal({ open, handleClose, type, data }: BookDataInterface) {

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
                
                    <Fragment>
                        {type === "Author" && data && (
                            data.authors.map((author: string, index) => (
                                <Stack key={index} spacing={1} divider= {<Divider/>}>  <Chip key={index} label={author} color='info' /> </Stack>

                            ))
                        )}
                        {type === "Category" && data && (
                            data.category.map((cat: string, index: number) => (
                                <Stack key={index} spacing={1} divider= {<Divider/>}> <Chip label={cat} color='info' /> </Stack>
                            ))
                        )}
                    </Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
