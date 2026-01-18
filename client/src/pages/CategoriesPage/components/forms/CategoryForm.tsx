import React, { useEffect } from "react";
import { FormInterface } from "../../../../interfaces/FormInterfaces";
import { useCreateAndUpdateForm } from "../../../../hooks/formHooks";
import { isICategory } from "../../../../components/tables/DataRow";
import { CREATE_UPDATE_FORM_FORMAT } from "../../../../enums/enums";
import { Alert, Box, Button, Container, Divider, Stack } from "@mui/material";
import StringValueField from "../../../../components/forms/StringValueField";


/**
 * Create & Update Forms for Categories
 * @returns rendered create category form component
 */
export default function CategoryForm({ format, data, handleClose }: FormInterface) {

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