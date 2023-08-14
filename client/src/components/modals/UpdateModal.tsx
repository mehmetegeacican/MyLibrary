import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Stack } from "@mui/material";
import { CreateBookForm } from "../../data/forms/CreateForms";

interface UpdateModalInterface {
    open: boolean;
    handleClose: () => void;
    dataFormat: string;
    setTrigger:Function;
}

export default function UpdateModal({ open, handleClose, dataFormat ,setTrigger}: UpdateModalInterface) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Update
            </DialogTitle>
            <DialogContent sx={{mt:1}} dividers>
                <DialogContentText id="alert-dialog-description">
                    <Stack spacing={2} sx={{mt:1}}>
                        {dataFormat === "book" && (<CreateBookForm setTrigger={setTrigger} format={"update"}/>)}
                    </Stack>
                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}
