import { Box, Container, Stack, Divider, Chip, Button, Alert } from "@mui/material";
import React, { useEffect } from "react";
import MultipleSelectionAutocomplete from "../../components/forms/MultipleSelectionAutocomplete";
import StringValueField from "../../components/forms/StringValueField";
import { IBook, ICategory } from "../../interfaces/DataInterfaces";
import { defaultBookCategories } from "../BookData";
import { getICategories, getStringCategories, useCreateAndUpdateForm } from "../../hooks/formHooks/useCreateAndUpdateForm";
import { useLibraryDataContext } from "../../hooks/contextHooks/useLibraryDataContext";
import { isIBook, isICategory } from "../../components/tables/DataRow";

/**
 * Create & Update Forms for Book
 * @returns rendered create book form component
 */
interface FormInterface {
    format:string;
    data?:IBook | ICategory;
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
    const { error,success, message, createBook,updateBook} = useCreateAndUpdateForm(formError, setFormError, formMessage, setFormMessage,formSuccess,setFormSuccess);
    const {categories} = useLibraryDataContext();


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
        if(data && isIBook(data)){
            setBookName(data.name);
            setAuthor(data.author);
            setSelectedStatus(data.status);
            setSelectedCategories(getICategories(data.category,categories));
        }
    },[data]);

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
                        categories={categories}
                        selected={selectedCategories}
                        setSelected={setSelectedCategories}
                    />
                    <Divider />
                    <Stack direction={'row'} spacing={2} alignContent={'center'}>
                        <Chip clickable onClick={() => setSelectedStatus("Red")} label="Red" color="error" variant={selectedStatus === "Red" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Reading")} label="Reading" color="warning" variant={selectedStatus === "Reading" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Will Read")} label="Will Read" color="success" variant={selectedStatus === "Will Read" ? "filled" : "outlined"} />
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


export function CategoryForm({format,data,handleClose}:FormInterface){

    //Hooks and Contexts
    const [formName,setFormName] = React.useState<string>("");
    const [formInfo,setFormInfo] = React.useState<string>("");
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [formError, setFormError] = React.useState<boolean>(false);
    const [formSuccess,setFormSuccess] = React.useState<boolean>(false);
    const { createCategory, updateCategory, error,message, success} = useCreateAndUpdateForm(formError, setFormError, formMessage, setFormMessage,formSuccess,setFormSuccess);

    useEffect(() => {
        if(data && isICategory(data)){
            setFormInfo(data.info);
            setFormName(data.name);
        }
    },[data]);

    const submit = async () => {
        if(format === "update" && data){
          await updateCategory(data.id, formName,formInfo);
          handleClose!();
        }
        else{
            await createCategory(formName,formInfo);
        }
     }

    return(
        <Box
        >
            <Container>
                <Stack spacing={2} alignContent={'center'}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <StringValueField label='Please Enter the Category name' data={formName} setter={setFormName} />
                        
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} spacing={2} alignContent={'center'}>
                         <StringValueField label='Please Enter the Category Info' data={formInfo} setter={setFormInfo} />
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