import { Box, Container, Stack, Divider, Chip, Button, Alert } from "@mui/material";
import React, { useEffect } from "react";
import MultipleSelectionAutocomplete from "../../components/forms/MultipleSelectionAutocomplete";
import StringValueField from "../../components/forms/StringValueField";
import { IBook, ICategory } from "../../interfaces/DataInterfaces";
import { defaultBookCategories } from "../BookData";
import { getICategories, getStringCategories, useCreateAndUpdateForm } from "../../hooks/formHooks/useCreateAndUpdateForm";

/**
 * Create & Update Forms for Book
 * @returns rendered create book form component
 */
interface FormInterface {
    format:string;
    data?:IBook;
    handleClose?: () => void;
}
export function BookForm({format, data, handleClose}:FormInterface) {
    // Variables -- Hooks 
    const [bookName, setBookName] = React.useState<string>('White Fang');
    const [author, setAuthor] = React.useState<string>('Jack London');
    const [selectedCategories, setSelectedCategories] = React.useState<ICategory[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>("Reading");
    //The useCreateAndUpdateForm hook variables
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [formError, setFormError] = React.useState<boolean>(false);
    const [formSuccess,setFormSuccess] = React.useState<boolean>(false);
    const { error,success, message, createBook,updateBook } = useCreateAndUpdateForm(formError, setFormError, formMessage, setFormMessage,formSuccess,setFormSuccess);



    const submit = async () => {
       if(format === "update" && data){
         await updateBook(data.id.toString(),bookName,author,getStringCategories(selectedCategories),selectedStatus);
         handleClose!();
       }
       else{
        await createBook(bookName, author, getStringCategories(selectedCategories), selectedStatus);
       }
    }

    useEffect(() => {
        if(data){
            setBookName(data.name);
            setAuthor(data.author);
            setSelectedStatus(data.status);
            setSelectedCategories(getICategories(data.category));
        }
    },[data])

    return (
        <Box
        >
            <Container>
                <Stack spacing={2} alignContent={'center'}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <StringValueField label='Please Enter the Book name' data={bookName} setter={setBookName} />
                        <StringValueField label='Please Enter the Author name' data={author} setter={setAuthor} />
                    </Stack>

                    <MultipleSelectionAutocomplete
                        label="Select Categories"
                        placeholder='categories'
                        categories={defaultBookCategories}
                        selected={selectedCategories}
                        setSelected={setSelectedCategories}
                    />
                    <Divider />
                    <Stack direction={'row'} spacing={2} alignContent={'center'}>
                        <Chip clickable onClick={() => setSelectedStatus("Red")} label="Red" color="error" variant={selectedStatus === "Red" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Reading")} label="Reading" color="warning" variant={selectedStatus === "Reading" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Will Reading")} label="Will Read" color="success" variant={selectedStatus === "Will Read" ? "filled" : "outlined"} />
                    </Stack>
                    <Divider />
                    {format === "create" && (<Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={submit}> Add </Button>)}
                    {format === "update" && (<Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={submit}> Update </Button>)}
                    {error && <Alert sx={{ mt: 2 }} severity="error"> {message}</Alert>}
                    {success && <Alert sx={{ mt: 2 }} severity="success"> {message}</Alert>}
                </Stack>
            </Container>
        </Box>

    )
};