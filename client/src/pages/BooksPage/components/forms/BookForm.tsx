import React, { useEffect } from "react";
import { useAuthContext, useLibraryDataContext } from "../../../../hooks/contextHooks";
import { getIAuthors, getICategories, getStringAuthors, getStringCategories, useCreateAndUpdateForm } from "../../../../hooks/formHooks";
import { CREATE_UPDATE_FORM_FORMAT } from "../../../../enums/enums";
import { postNewImage } from "../../../../apis/imageApis";
import { isIBook } from "../../../../components/tables/DataRow";
import { IAuthor, ICategory } from "../../../../interfaces/DataInterfaces";
import { Alert, Autocomplete, Box, Button, Chip, Container, Divider, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";
import StringValueField from "../../../../components/forms/StringValueField";
import MultipleSelectionAutocomplete from "../../../../components/forms/MultipleSelectionAutocomplete";
import Flag from "react-world-flags";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import UploadButton from "../../../../components/buttons/uploadButton";
import { FormInterface, langInterface } from "../../../../interfaces/FormInterfaces";


const languageList: langInterface[] = [
    { code: "TR", label: "Turkish" },
    { code: "GB", label: "English" },
]

/**
 * Create & Update Forms for Book
 * @returns rendered create book form component
 */
export default function BookForm({ format, data, handleClose }: FormInterface) {
    // Variables -- Hooks 
    const { user, plan } = useAuthContext();
    const [bookName, setBookName] = React.useState<string>('White Fang');
    const [desc, setDesc] = React.useState<string>('A wolves story by Jack London');
    const [selectedCategories, setSelectedCategories] = React.useState<ICategory[]>([]);
    const [selectedAuthors, setSelectedAuthors] = React.useState<IAuthor[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>("Reading");
    const [language, setLanguage] = React.useState<langInterface | null>(languageList[1]);
    const [liked, setLiked] = React.useState<number>(0);
    const [influence,setInfluence] = React.useState<number>(0);
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
        if (format === CREATE_UPDATE_FORM_FORMAT.UPDATE && data) {
            await updateBook(data.id.toString(), bookName, desc, getStringCategories(selectedCategories), selectedStatus, getStringAuthors(selectedAuthors), imagePath, language?.code,liked,influence);
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
            await createBook(bookName, desc, getStringCategories(selectedCategories), selectedStatus, getStringAuthors(selectedAuthors), imagePath, language?.code,liked,influence);
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
            if (data.language) {
                switch (data.language) {
                    case 'TR':
                        setLanguage(languageList[0])
                        break;
                    case 'GB':
                        setLanguage(languageList[1])
                        break;
                }
            }
            if (data.authors) {
                setSelectedAuthors(getIAuthors(data.authors, authors));
            }
            else {
                setSelectedAuthors(getIAuthors([], authors));
            }
            if(data.liked){
                setLiked(parseInt(data.liked));
            }
            if(data.influence){
                setInfluence(parseInt(data.influence));
            }
        }
    }, [data]);

    return (
        <Box
        >
            <Container>
                <Stack spacing={2} alignContent={'center'} sx={{
                    mt:1.5
                }}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
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
                    <Stack direction={'row'} spacing={3} alignItems={'center'} sx={{ mt: 1 }}>
                        <Autocomplete
                            disablePortal
                            options={languageList}
                            sx={{ width: '50%' }}
                            value={language}
                            onChange={(_, newValue: langInterface | null) => {
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
                        <Stack>
                            <Typography component="legend">Liked</Typography>
                            <Rating
                                name="book rating"
                                value={liked}
                                size="medium"
                                icon={<Favorite fontSize="inherit" />}
                                emptyIcon={<FavoriteBorder fontSize="inherit" />}
                                style={{
                                    color: 'red'
                                }}
                                onChange={(_, newValue) => {
                                    if (newValue) {
                                        setLiked(newValue);
                                    }
                                }}
                            />
                        </Stack>
                        {plan === 'pro' && <Stack>
                            <Typography component="legend">Influence</Typography>
                            <Rating
                                name="influence"
                                value={influence}
                                size="medium"
                                style={{
                                    color: 'skyblue'
                                }}
                                onChange={(_, newValue) => {
                                    if (newValue) {
                                        setInfluence(newValue);
                                    }
                                }}
                            />
                        </Stack>}
                    </Stack>

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
                    {format === CREATE_UPDATE_FORM_FORMAT.CREATE && (<Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={submit}> Add </Button>)}
                    {format === CREATE_UPDATE_FORM_FORMAT.UPDATE && (<Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={submit}> Update </Button>)}
                    {error && <Alert sx={{ mt: 2 }} severity="error"> {message}</Alert>}
                    {success && <Alert sx={{ mt: 2 }} severity="success"> {message}</Alert>}
                </Stack>
            </Container>
        </Box>

    )
};