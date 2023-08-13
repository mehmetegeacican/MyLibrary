import { Box, Container, Stack, Divider, Chip, Button } from "@mui/material";
import React from "react";
import MultipleSelectionAutocomplete from "../../components/forms/MultipleSelectionAutocomplete";
import StringValueField from "../../components/forms/StringValueField";
import { ICategory } from "../../interfaces/DataInterfaces";
import { defaultBookCategories } from "../BookData";

/**
 * Create Form for Create Book
 * @returns rendered create book form component
 */
export function CreateBookForm() {
    // Variables -- Hooks 
    const [bookName, setBookName] = React.useState<string>('White Fang');
    const [author, setAuthor] = React.useState<string>('Jack London');
    const [selectedCategories, setSelectedCategories] = React.useState<ICategory[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>("Reading");


    return (
        <Box
            component="form"
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
                        <Chip clickable onClick={() => setSelectedStatus("Will Reading")} label="Will Read" color="success" variant={selectedStatus === "Will Reading" ? "filled" : "outlined"} />
                    </Stack>
                    <Divider />
                    <Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={() => console.log("Clicked")}> Add </Button>
                </Stack>
            </Container>
        </Box>

    )
};