import { Dialog, DialogTitle, DialogContent, Button, Stack, Alert } from "@mui/material";
import { AuthorForm, BookForm, CategoryForm } from "../../data/forms/CreateAndUpdateForms";
import { useCreateAndUpdateForm } from "../../hooks/formHooks";
import React from "react";
import { IBook, ICategory } from "../../interfaces/DataInterfaces";
import { isIAuthor, isIBook, isICategory } from "../tables/DataRow";

interface UpdateModalInterface {
    open: boolean;
    handleClose: () => void;
    data: (IBook |ICategory);
}

export default function  UpdateModal({ open, handleClose,  data }: UpdateModalInterface) {

    //Hooks
    const [formError, setFormError] = React.useState<boolean>(false);
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [formSuccess, setFormSuccess] = React.useState<boolean>(false);
    const { error, message } = useCreateAndUpdateForm(formError, setFormError, formMessage, setFormMessage, formSuccess, setFormSuccess);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Stack direction='row' justifyContent={'space-between'}>
                    Update
                    <Button onClick={handleClose}>Cancel</Button>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ mt: 1 }} dividers>

                <Stack spacing={2} sx={{ mt: 1 }}>
                    {isIBook(data) &&  (<BookForm format={"update"} data={data} handleClose={handleClose}/>)}
                    {isICategory(data) && (<CategoryForm format="update" data={data} handleClose={handleClose}/> )}
                    {isIAuthor(data) && (<AuthorForm format="update" data={data} handleClose={handleClose}/> )}
                </Stack>

                {error && <Alert sx={{ mt: 2 }} severity="error"> {message}</Alert>}
                
            </DialogContent>
        </Dialog>
    )
}
