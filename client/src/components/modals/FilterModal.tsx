import { Dialog, DialogTitle, DialogContent, Button, Stack, Alert, DialogActions, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, IconButton, Chip, Container, Grid, Typography } from "@mui/material";
import StringValueField from "../forms/StringValueField";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { BookFilterOptions, CategoryFilterOptions } from "../../data/tables/TableDatas";
import { IBook, ICategory } from "../../interfaces/DataInterfaces";
import { isIBook, isICategory } from "../tables/DataRow";


interface FilterModalInterface {
    open: boolean;
    handleClose: () => void;
    exampleData: IBook | ICategory;
}



export default function FilterModal({ open, handleClose , exampleData}: FilterModalInterface) {

    //Hooks
    const [selectedHeader, setSelectedHeader] = React.useState<string>("");
    const [stringData, setStringData] = React.useState<string>("");
    const [chips,setChips] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedHeader(event.target.value as string);
    };

    const handleDelete = (chip:string) => {
        const index = chips.indexOf(chip);
        setChips((prev) => [...prev.slice(0,index), ...prev.slice(index + 1)])
    }

    const addChips = (header:string,value:string) => {
        setChips((prev) => [...prev,header + "-" + value])
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle id="alert-dialog-title">
                <Stack direction='row' justifyContent={'space-between'}>
                     <Typography color={'info'} variant="h6"> Filter</Typography>
                    <Button onClick={handleClose}>Cancel</Button>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ mt: 1 }} dividers>

                <Stack spacing={2} sx={{ mt: 1 }} direction={'row'}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Header</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedHeader}
                            label="Header"
                            onChange={handleChange}
                        >
                            {isIBook(exampleData) && BookFilterOptions.map((header: string) => {
                                return (
                                    <MenuItem value={header}>{header}</MenuItem>
                                )
                            })}
                            {isICategory(exampleData) && CategoryFilterOptions.map((header: string) => {
                                return (
                                    <MenuItem value={header}>{header}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <StringValueField label={"Please select the data"} data={stringData} setter={setStringData} />
                    <IconButton aria-label="add" sx={{ mt: 1 }} onClick={() => addChips(selectedHeader,stringData)}>
                        <AddIcon />
                    </IconButton>
                </Stack>
                <Grid item sx={{ mt: 2 }} spacing={4} direction='row'>
                    {chips.map((chip:string) => {
                        return(
                            <>
                                <Chip label={chip} onDelete={() => handleDelete(chip)}/>
                            </>
                            
                        )
                    })}
                </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent:'space-between', ml:2,mr:2}}>
                <Button autoFocus color='error' onClick={() => setChips([])}>
                    Reset
                </Button>
                <Button autoFocus onClick={handleClose}>
                    Filter
                </Button>
            </DialogActions>
        </Dialog>
    )
}
