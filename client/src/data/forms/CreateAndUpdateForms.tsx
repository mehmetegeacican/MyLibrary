import { Box, Container, Stack, Divider, Chip, Button, Alert, Autocomplete, TextField, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MultipleSelectionAutocomplete from "../../components/forms/MultipleSelectionAutocomplete";
import StringValueField from "../../components/forms/StringValueField";
import { IAuthor, IBook, ICategory } from "../../interfaces/DataInterfaces";
import { getIAuthors, getICategories, getStringAuthors, getStringCategories, useCreateAndUpdateForm } from "../../hooks/formHooks/useCreateAndUpdateForm";
import { useLibraryDataContext } from "../../hooks/contextHooks/useLibraryDataContext";
import { isIAuthor, isIBook, isICategory } from "../../components/tables/DataRow";
import UploadButton from "../../components/buttons/uploadButton";
import { postNewImage } from "../../apis/imageApis";
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";
import { Label } from "@mui/icons-material";
import Flag from "react-world-flags";


/**
 * Create & Update Forms for Book
 * @returns rendered create book form component
 */
interface FormInterface {
    format: string;
    data?: IBook | ICategory | IAuthor;
    handleClose?: () => void;
}

type langInterface = {
    code: string;
    label: string;
}

const languageList: langInterface[] = [
    { code: "TR", label: "Turkish" },
    { code: "GB", label: "English" },
    { code: "ES", label: "Spanish" },
    { code: "FR", label: "French" },
    { code: "DE", label: "German" },
]
export function BookForm({ format, data, handleClose }: FormInterface) {
    // Variables -- Hooks 
    const { user } = useAuthContext();
    const [bookName, setBookName] = React.useState<string>('White Fang');
    const [desc, setDesc] = React.useState<string>('A wolves story by Jack London');
    const [selectedCategories, setSelectedCategories] = React.useState<ICategory[]>([]);
    const [selectedAuthors, setSelectedAuthors] = React.useState<IAuthor[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>("Reading");
    const [language, setLanguage] = React.useState<langInterface | null>(languageList[1]);
    //The useCreateAndUpdateForm hook variables
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [formError, setFormError] = React.useState<boolean>(false);
    const [formSuccess, setFormSuccess] = React.useState<boolean>(false);
    const { error, success, message, createBook, updateBook } = useCreateAndUpdateForm(formError, setFormError, formMessage, setFormMessage, formSuccess, setFormSuccess);
    const { categories, authors, bookTrigger, dispatch } = useLibraryDataContext();

    // Upload 
    const [imagePath, setImagePath] = React.useState<string>("");
    const [uploadedPicture, setUploadedPicture] = React.useState<File | null>(null);


    const submit = async () => {
        if (format === "update" && data) {
            await updateBook(data.id.toString(), bookName, desc, getStringCategories(selectedCategories), selectedStatus, getStringAuthors(selectedAuthors), imagePath);
            if (uploadedPicture) {
                let formData = new FormData();
                formData.append('location', 'books');
                formData.append('image', uploadedPicture);
                await postNewImage(formData, user!.token);
            }
            handleClose!();
            dispatch({ type: 'TRIGGER_BOOKS', payload: !bookTrigger })
        }
        else {
            await createBook(bookName, desc, getStringCategories(selectedCategories), selectedStatus, getStringAuthors(selectedAuthors), imagePath);
            if (uploadedPicture) {
                let formData = new FormData();
                formData.append('location', 'books');
                formData.append('image', uploadedPicture);
                await postNewImage(formData, user!.token);
            }
        }
    }

    useEffect(() => {
        if (data && isIBook(data)) {
            setBookName(data.name);
            if (data.description) {
                setDesc(data.description);
            }
            else {
                setDesc("");
            }
            if (data.imagePath) {
                setImagePath(data.imagePath);
            }
            setSelectedStatus(data.status);
            setSelectedCategories(getICategories(data.category, categories));

            if (data.authors) {
                setSelectedAuthors(getIAuthors(data.authors, authors));
            }
            else {
                setSelectedAuthors(getIAuthors([], authors));
            }

        }
    }, [data]);

    return (
        <Box
        >
            <Container>
                <Stack spacing={2} alignContent={'center'}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ mt: 1 }}>
                        <StringValueField label='Please Enter the Book name' data={bookName} setter={setBookName} />
                        <StringValueField label='Please Enter the Book Description' data={desc} setter={setDesc} />
                    </Stack>
                    <MultipleSelectionAutocomplete
                        label="Select Author(s)"
                        placeholder='Author(s)'
                        dataset={authors}
                        selected={selectedAuthors}
                        setSelected={setSelectedAuthors}
                    />
                    <MultipleSelectionAutocomplete
                        label="Select Categories"
                        placeholder='categories'
                        dataset={categories}
                        selected={selectedCategories}
                        setSelected={setSelectedCategories}
                    />
                    <Autocomplete
                        disablePortal
                        options={languageList}
                        sx={{ width: '50%' }}
                        value={language}
                        onChange={(event, newValue: langInterface | null) => {
                            setLanguage(newValue);
                        }}
                        renderOption={(props, option) => (
                            <MenuItem {...props}>
                                <Box display="flex" alignItems="center">
                                    <Flag code={option.code} style={{ width: 24, height: 18, marginRight: 8 }} />
                                    <Typography>{option.label}</Typography>
                                </Box>
                            </MenuItem>
                        )}
                        renderInput={(params) => <TextField {...params} label="Language" />}
                    />
                    <Divider />
                    <Stack direction={'row'} spacing={2} alignContent={'center'}>
                        <Chip clickable onClick={() => setSelectedStatus("Read")} label="Read" color="error" variant={selectedStatus === "Read" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Reading")} label="Reading" color="warning" variant={selectedStatus === "Reading" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Will Read")} label="Will Read" color="success" variant={selectedStatus === "Will Read" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Will Continue")} label="Will Continue" color="secondary" variant={selectedStatus === "Will Continue" ? "filled" : "outlined"} />
                        <Chip clickable onClick={() => setSelectedStatus("Not Planned")} label="Not Planned" color="default" variant={selectedStatus === "Not Planned" ? "filled" : "outlined"} />
                    </Stack>
                    <Divider />
                    <UploadButton
                        title="Upload Cover"
                        imageFile={uploadedPicture}
                        setImageFile={setUploadedPicture}
                        imagePath={imagePath}
                        setImagePath={setImagePath}
                    />
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


export function AuthorForm({ format, data, handleClose }: FormInterface) {
    //Hooks & Contexts
    const [formName, setFormName] = React.useState<string>("");
    const [formInfo, setFormInfo] = React.useState<string>("");
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [formError, setFormError] = React.useState<boolean>(false);
    const [formSuccess, setFormSuccess] = React.useState<boolean>(false);
    const { error, message, success, createAuthor, updateAuthor } = useCreateAndUpdateForm(formError, setFormError, formMessage, setFormMessage, formSuccess, setFormSuccess);

    //submit
    const submit = async () => {
        if (format === "update" && data) {
            await updateAuthor(data.id, formName, formInfo);
            handleClose!();
        }
        else {
            await createAuthor(formName, formInfo);
        }
    }


    useEffect(() => {
        if (data && isIAuthor(data)) {
            setFormName(data.authorName);
            setFormInfo(data.authorDetails);
        }
    }, [data]);

    return (
        <Box
        >
            <Container>
                <Stack spacing={2} alignContent={'center'}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <StringValueField label='Please Enter the Author name' data={formName} setter={setFormName} />
                        <StringValueField label='Please Enter the Author Info' data={formInfo} setter={setFormInfo} />
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} spacing={2} alignContent={'center'}>

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
}


export function CategoryForm({ format, data, handleClose }: FormInterface) {

    //Hooks and Contexts
    const [formName, setFormName] = React.useState<string>("");
    const [formInfo, setFormInfo] = React.useState<string>("");
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [formError, setFormError] = React.useState<boolean>(false);
    const [formSuccess, setFormSuccess] = React.useState<boolean>(false);
    const { createCategory, updateCategory, error, message, success } = useCreateAndUpdateForm(formError, setFormError, formMessage, setFormMessage, formSuccess, setFormSuccess);

    useEffect(() => {
        if (data && isICategory(data)) {
            setFormInfo(data.info);
            setFormName(data.name);
        }
    }, [data]);

    const submit = async () => {
        if (format === "update" && data) {
            await updateCategory(data.id, formName, formInfo);
            handleClose!();
        }
        else {
            await createCategory(formName, formInfo);
        }
    }

    return (
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