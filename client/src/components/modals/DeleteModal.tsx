import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useLibraryDataContext } from "../../hooks/contextHooks/useLibraryDataContext";
import { IAuthor, IBook, ICategory } from "../../interfaces/DataInterfaces";
import { isIAuthor, isIBook, isICategory } from "../tables/DataRow";
import { useDeleteModal } from "../../hooks/modalHooks/useDeleteModal";



interface DeleteModalImnterface {
    multiple: boolean;
    open:boolean;
    handleClose: () => void;
    data : IBook | ICategory | IAuthor;
}

export default function DeleteModal({multiple,open,handleClose,data}:DeleteModalImnterface) {

    //Hooks & contexts
    const { deleteBook ,deleteCategory, deleteAuthor} = useDeleteModal();
    const handleDelete = async () => {
        if(isIBook(data)){
            await deleteBook(data.id);
        }
        else if(isICategory(data)){
            await deleteCategory(data.id);
        }
        else if(isIAuthor(data)){
            await deleteAuthor(data.id);
        }
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
                <Button onClick={async () => await handleDelete()}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
