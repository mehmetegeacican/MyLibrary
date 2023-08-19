import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useLibraryDataContext } from "../../hooks/contextHooks/useLibraryDataContext";
import { IBook, ICategory } from "../../interfaces/DataInterfaces";
import { isIBook, isICategory } from "../tables/DataRow";
import { useDeleteModal } from "../../hooks/modalHooks/useDeleteModal";



interface DeleteModalImnterface {
    open:boolean;
    handleClose: () => void;
    data : IBook | ICategory;
}

export default function DeleteModal({open,handleClose,data}:DeleteModalImnterface) {

    //Hooks & contexts
    const { deleteBook ,deleteCategory} = useDeleteModal();
    const handleDelete = async () => {
        console.log("entered");
        console.log(data);
        if(isIBook(data)){
            console.log("entered else if");
            await deleteBook(data.id);
        }
        else if(isICategory(data)){
            console.log("entered else if");
            await deleteCategory(data.id);
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
