import { Dialog, DialogTitle, DialogContent, Button, Stack, Alert } from "@mui/material";
import { BookForm } from "../../data/forms/CreateAndUpdateForms";
import { useCreateAndUpdateForm } from "../../hooks/formHooks/useCreateAndUpdateForm";
import React, { useEffect } from "react";
import { IBook } from "../../interfaces/DataInterfaces";

interface UpdateModalInterface {
    open: boolean;
    handleClose: () => void;
    dataFormat: string;
    data: IBook;
}

export default function UpdateModal({ open, handleClose, dataFormat, data }: UpdateModalInterface) {

    //Hooks
    const [formError, setFormError] = React.useState<boolean>(false);
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [formSuccess, setFormSuccess] = React.useState<boolean>(false);

    const { error, message, success } = useCreateAndUpdateForm(formError, setFormError, formMessage, setFormMessage, formSuccess, setFormSuccess);

    useEffect(() => {
        handleClose();
    },[data]);

    
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
                    {dataFormat === "book" && (<BookForm format={"update"} data={data} />)}
                </Stack>

                {error && <Alert sx={{ mt: 2 }} severity="error"> {message}</Alert>}
                {success && <Alert sx={{ mt: 2 }} severity="success"> {message}</Alert>}
            </DialogContent>
        </Dialog>
    )
}
