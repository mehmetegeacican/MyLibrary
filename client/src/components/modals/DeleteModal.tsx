import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { IAuthor, IBook, ICategory, INote } from "../../interfaces/DataInterfaces";
import { isIAuthor, isIBook, isICategory, isINote } from "../tables/DataRow";
import { useDeleteModal } from "../../hooks/modalHooks/useDeleteModal";
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";



interface DeleteModalImnterface {
    selectedIds? : number[];
    open:boolean;
    handleClose: () => void;
    data : IBook | ICategory | IAuthor | INote;
}

export default function DeleteModal({selectedIds,open,handleClose,data}:DeleteModalImnterface) {

    //Hooks & contexts
    const { deleteBook ,deleteCategory, deleteAuthor} = useDeleteModal();
    const handleDelete = async () => {
        if(selectedIds){
            if(isIBook(data)){
                let promises: Promise<void>[] = [];
                selectedIds.forEach((id:number) => {
                    promises.push(deleteBook(id));
                });
                await Promise.all(promises);
            }
            else if(isICategory(data)){
                let promises: Promise<void>[] = [];
                selectedIds.forEach((id:number) => {
                    promises.push(deleteCategory(id));
                });
                await Promise.all(promises);
            }
            else if(isIAuthor(data)){
                let promises: Promise<void>[] = [];
                selectedIds.forEach((id:number) => {
                    promises.push(deleteAuthor(id));
                });
                await Promise.all(promises);
            }
        }
        else{
            if(isIBook(data)){
                await deleteBook(data.id);
            }
            else if(isICategory(data)){
                await deleteCategory(data.id);
            }
            else if(isIAuthor(data)){
                await deleteAuthor(data.id);
            }
            else if(isINote(data)){
                console.log("Note deletion", data);
            }
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
