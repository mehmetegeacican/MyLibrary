import { Box, Container, Stack, Divider,  Button, Alert } from "@mui/material";
import React, { useEffect } from "react";
import StringValueField from "../../components/forms/StringValueField";
import { IAuthor, IBook, ICategory } from "../../interfaces/DataInterfaces";
import { useCreateAndUpdateForm } from "../../hooks/formHooks";
import { isIAuthor, isICategory } from "../../components/tables/DataRow";
import { CREATE_UPDATE_FORM_FORMAT } from "../../enums/enums";


/**
 * Create & Update Forms for Book
 * @returns rendered create book form component
 */
interface FormInterface {
    format: string;
    data?: IBook | ICategory | IAuthor;
    handleClose?: () => void;
}
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
        if (format === CREATE_UPDATE_FORM_FORMAT.UPDATE && data) {
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
                    {format === CREATE_UPDATE_FORM_FORMAT.CREATE && (<Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={submit}> Add </Button>)}
                    {format === CREATE_UPDATE_FORM_FORMAT.UPDATE && (<Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={submit}> Update </Button>)}
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
        if (format === CREATE_UPDATE_FORM_FORMAT.UPDATE && data) {
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
                    {format === CREATE_UPDATE_FORM_FORMAT.CREATE && (<Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={submit}> Add </Button>)}
                    {format === CREATE_UPDATE_FORM_FORMAT.UPDATE && (<Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={submit}> Update </Button>)}
                    {error && <Alert sx={{ mt: 2 }} severity="error"> {message}</Alert>}
                    {success && <Alert sx={{ mt: 2 }} severity="success"> {message}</Alert>}
                </Stack>
            </Container>
        </Box>
    )
};