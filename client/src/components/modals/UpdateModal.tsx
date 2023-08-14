import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Stack, Alert } from "@mui/material";
import { CreateBookForm } from "../../data/forms/CreateForms";
import { useCreateForm } from "../../hooks/formHooks/useCreateForm";
import React from "react";
import { IBook } from "../../interfaces/DataInterfaces";

interface UpdateModalInterface {
    open: boolean;
    handleClose: () => void;
    dataFormat: string;
    setTrigger:Function;
    data: IBook;
}

export default function UpdateModal({ open, handleClose, dataFormat ,setTrigger,data}: UpdateModalInterface) {

    //Hooks
    const [formError,setFormError] = React.useState<boolean>(false);
    const [formMessage,setFormMessage] = React.useState<string>("");
    const [success,setSuccess] = React.useState<boolean>(false);

    const {error,message,updateBook} = useCreateForm(formError,setFormError,formMessage,setFormMessage,success,setSuccess);

    //Handler
    const handleUpdate = () => {
       updateBook;
    }
    
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
                
                <Stack spacing={2} sx={{mt:1}}>
                    {dataFormat === "book" && (<CreateBookForm setTrigger={setTrigger} format={"update"} data={data}/>)}
                </Stack>
                
                {error && <Alert sx={{ mt: 2 }} severity="error"> {message}</Alert>}
                {success && <Alert sx={{ mt: 2 }} severity="success"> {message}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Update</Button>
            </DialogActions>
            
        </Dialog>
    )
}
