import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { IAuthor, IBook, ICategory, IMindMap, INote } from "../../interfaces/DataInterfaces";
import { isIAuthor, isIBook, isICategory, isIMindMap, isINote } from "../tables/DataRow";
import { useDeleteModal } from "../../hooks/modalHooks";



interface DeleteModalImnterface {
    selectedIds? : number[];
    open:boolean;
    handleClose: () => void;
    data : IBook | ICategory | IAuthor | INote | IMindMap;
}

export default function DeleteModal({selectedIds,open,handleClose,data}:DeleteModalImnterface) {

    //Hooks & contexts
    const { deleteBook ,deleteCategory, deleteAuthor,deleteNote, deleteMindMap} = useDeleteModal();
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
                await deleteNote(data.id);
            }
            else if(isIMindMap(data)){
                await deleteMindMap(data._id);
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
