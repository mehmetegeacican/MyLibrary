import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useLibraryDataContext } from "../../hooks/contextHooks/useLibraryDataContext";


interface DeleteModalImnterface {
    open:boolean;
    handleClose: () => void;
    deleteData: () => void;
}

export default function DeleteModal({open,handleClose,deleteData}:DeleteModalImnterface) {

    //Hooks & contexts 
    const {bookTrigger,dispatch} = useLibraryDataContext();

    const handleDelete = async () => {
        await deleteData();
        dispatch({type:'TRIGGER_BOOKS',payload:!bookTrigger}); // This should be conditional
        handleClose();
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
                    Do you want to delete the following content(s)? 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
