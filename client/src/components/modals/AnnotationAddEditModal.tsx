import { Autocomplete, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack, TextField } from "@mui/material";
import { IAnnotation, IAnnotationBook, IBook } from "../../interfaces/DataInterfaces";
import { useLibraryTheme } from "../../hooks/theme/useLibraryTheme";
import { useEffect, useState } from "react";
import { useCreateAndUpdateForm } from "../../hooks/formHooks";
import { useAuthContext, useLibraryDataContext } from "../../hooks/contextHooks";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
interface AnnotationModalInterface {
    open: boolean;
    handleClose: () => void;
    annotation?: IAnnotation | null;
}


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AnnotationAddEditModal({ open, handleClose, annotation }: AnnotationModalInterface) {
    const { libTheme } = useLibraryTheme();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const { createAnnotation, updateAnnotation } = useCreateAndUpdateForm(error, setError, message, setMessage, success, setSuccess);
    const { annotationTrigger, dispatch, books } = useLibraryDataContext();
    const [annotationContent, setAnnotationContent] = useState(annotation?.annotation || "");
    const [selectedBook, setSelectedBook] = useState<IAnnotationBook | null>(null);
    const [comment, setComment] = useState(annotation?.comment || "");
    const [pageNumber, setPageNumber] = useState(annotation?.pageNumber || "");
    const { user } = useAuthContext();

    const getBookValueAsBookAnnotationData = (book: IBook | null): IAnnotationBook | null => {
        if (book) {
            return {
                uuid: book.uuid || "",
                name: book.name,
                authors: book.authors,
                imagePath: book.imagePath || ""
            }
        }
        return null;
    }

    const handleSave = async () => {
        const reqBody = {
            userId: user?.id,
            annotation: annotationContent,
            comment: comment,
            pageNumber: pageNumber,
            bookId: selectedBook?.uuid
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


    const handleCloseModal = () => {
        setAnnotationContent("");
        setSelectedBook(null);
        setComment("");
        setPageNumber("");
        handleClose();
    }

    useEffect(() => {
        if (open && annotation) {
            setAnnotationContent(annotation?.annotation || "");
            setComment(annotation?.comment || "");
            setPageNumber(annotation?.pageNumber || "");
            setSelectedBook(annotation.book || null);

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
                    multiline
                    rows={10}
                    id="annotation"
                    name="Annotation"
                    label="Annotation Content"
                    value={annotationContent}
                    onChange={(e) => setAnnotationContent(e.target.value)}
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogContent>
                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ width: '100%' }}>
                    {/* Book Selector - Takes up 70% of the row */}
                    <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Autocomplete
                            id="checkboxes-tags-demo"
                            options={books.map((book) => getBookValueAsBookAnnotationData(book)) as IAnnotationBook[]}
                            fullWidth
                            filterSelectedOptions
                            disableCloseOnSelect
                            onChange={(_: any, newValue: IAnnotationBook | null) => {
                                setSelectedBook({
                                    uuid: newValue?.uuid || "",
                                    name: newValue?.name || "",
                                    authors: newValue?.authors || [],
                                    imagePath: newValue?.imagePath || ""
                                });
                            }}
                            getOptionLabel={(option) => option.name}
                            value={selectedBook}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select the Book"
                                    placeholder="Search for the book..."
                                />
                            )}
                        />
                    </Box>

                    {/* Page Number - Fixed width or smaller flex portion */}
                    <Box sx={{ width: 150 }}>
                        <TextField
                            autoFocus
                            required
                            color={libTheme}
                            margin="none" // Changed from dense to none to align better with Autocomplete height
                            id="Page"
                            name="Page"
                            label="Page Number"
                            value={pageNumber}
                            onChange={(e) => setPageNumber(parseInt(e.target.value) || "")}
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                    </Box>
                </Stack>
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    multiline
                    rows={10}
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
            <DialogActions>
                <Button onClick={() => {
                    handleCloseModal();
                }} color={libTheme} >Cancel</Button>
                <Button onClick={handleSave} color={libTheme}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}