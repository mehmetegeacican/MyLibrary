import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack, TextField } from "@mui/material";
import { IAnnotation } from "../../interfaces/DataInterfaces";
import { useLibraryTheme } from "../../hooks/theme/useLibraryTheme";
import { useEffect, useState } from "react";
import { useCreateAndUpdateForm } from "../../hooks/formHooks";
import { useLibraryDataContext } from "../../hooks/contextHooks";

interface AnnotationModalInterface {
    open: boolean;
    handleClose: () => void;
    annotation?: IAnnotation | null;
}
export default function AnnotationAddEditModal({ open, handleClose, annotation }: AnnotationModalInterface) {
    const { libTheme } = useLibraryTheme();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const { createAnnotation, updateAnnotation } = useCreateAndUpdateForm(error, setError, message, setMessage, success, setSuccess);
    const {annotationTrigger, dispatch} = useLibraryDataContext();
    const [annotationContent, setAnnotationContent] = useState(annotation?.annotation || "");
    const [comment, setComment] = useState(annotation?.comment || "");
    const [pageNumber, setPageNumber] = useState(annotation?.pageNumber || "");


    const handleSave = async () => {
        const reqBody = {
            annotation: annotationContent,
            comment: comment,
            pageNumber: pageNumber
        }
        if (!annotation) {
            await createAnnotation(reqBody);
        }
        else {
            await updateAnnotation(annotation.id, reqBody);
        }
        dispatch({
            type: 'TRIGGER_ANNOTATIONS',
            payload: !annotationTrigger
        })
        handleClose();
    }

    useEffect(() => {
        if (open && annotation) {
            setAnnotationContent(annotation?.annotation || "");
            setComment(annotation?.comment || "");
            setPageNumber(annotation?.pageNumber || "");

        }
        else {
            setAnnotationContent("");
            setComment("");
            setPageNumber("");
        }


    }, [annotation]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth >
            <DialogTitle>{!annotation ? 'Add Annotation' : 'Edit Annotation'}</DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText color={libTheme}>
                    Add or Update Annotations from here.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    color={libTheme}
                    margin="dense"
                    id="annotation"
                    name="Annotation"
                    label="Annotation Content"
                    value={annotationContent}
                    onChange={(e) => setAnnotationContent(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                Search Section Here. Search for the Book you want to add the annotation to. Select the Book from the list.
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    multiline
                    rows={12}
                    color={libTheme}
                    margin="dense"
                    id="annotation"
                    name="Annotation"
                    label="What are your thoughts on this annotation?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogContent>
                <Stack dir="column" width="20%">
                    <TextField
                        autoFocus
                        required
                        color={libTheme}
                        margin="dense"
                        id="Page"
                        name="Page"
                        label="Page Number"
                        value={pageNumber}
                        onChange={(e) => setPageNumber(parseInt(e.target.value) || "")}
                        type="number"
                        fullWidth
                        variant="standard"
                    />

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    handleClose();
                }} color={libTheme} >Cancel</Button>
                <Button onClick={handleSave} color={libTheme}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}