import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import React from 'react'


interface BookDataInterface {
    open:boolean;
    handleClose: () => void;
}

export default function BookDataModal({open,handleClose}:BookDataInterface) {
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
                    The Authors or the Categories of the Book
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
