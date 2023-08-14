import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Stack, Chip, Divider } from '@mui/material';
import React from 'react'


interface SelectionModalInterface {
    options: string[];
    open: boolean;
    handleClose: () => void;
}


export default function SelectionModal({ options, open, handleClose }: SelectionModalInterface) {
    const [selectedStatus,setSelectedStatus] = React.useState<string>("");
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Select Status
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   <Stack spacing={2}>
                        <Chip clickable onClick={() => setSelectedStatus("Red")} label="Red" color="error" variant={selectedStatus === "Red" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Reading")} label="Reading" color="warning" variant={selectedStatus === "Reading" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Will Reading")} label="Will Read" color="success" variant={selectedStatus === "Will Reading" ? "filled" : "outlined"} />
                   </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
