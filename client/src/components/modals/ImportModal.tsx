import { IBook, ICategory, IAuthor } from '../../interfaces/DataInterfaces';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, styled, Typography, Box, Alert, Snackbar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';
import { isIAuthor, isIBook, isICategory } from '../tables/DataRow';
import { useImportModal } from '../../hooks/modalHooks';


interface ImportModalInterface {
    open: boolean;
    handleClose: () => void;
    data: IBook | ICategory | IAuthor;
}

const VisuallyHiddenInput = styled('input')({
    marginTop: 2,
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ImportModal({ open, handleClose, data }: ImportModalInterface) {
    //Hooks
    const [path, setPath] = React.useState<string>("");
    const { importBooks, error, message, status, success ,importAuthors,importCategories } = useImportModal();
    const [file, setFile] = React.useState<File>();
    //Handler
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setPath(file.name);  // Update the state with the file name
            setFile(file);
        }
    };

    const submit = async () => {
        if (file && isIBook(data)) {
            await importBooks(file)
        }
        else if(file && isICategory(data)){
            await importCategories(file);
        }
        else if(file && isIAuthor(data)){
            await importAuthors(file);
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Warning!
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The following file with the its contents will be imported, do you want to proceed?
                </DialogContentText>
                <Box display={'flex'} justifyContent={'center'}>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ height: 40, alignSelf: 'center' }}>
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                    </Button>
                    <DialogContent> <Typography>{path}</Typography> </DialogContent>
                </Box>


                {error && <Alert sx={{ mt: 2 }} severity="error"> {message}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={async () => submit()}>
                    Import
                </Button>

            </DialogActions>
            
            <Snackbar
                open={success}
                message={"Inserted: " + status.inserted + ", Failed: " + status.failed + ", Duplicate: " + status.duplicate}
            />
        </Dialog>
    )
}
