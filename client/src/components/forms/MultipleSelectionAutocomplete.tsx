import { Autocomplete, Checkbox, TextField } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ICategory } from '../../interfaces/DataInterfaces';

interface AutocompleteInterface {
    label: string;
    placeholder: string;
    categories: ICategory[] ;
    selected: ICategory[];
    setSelected: Function;
}

export default function MultipleSelectionAutocomplete({ label, placeholder, categories, selected, setSelected }: AutocompleteInterface) {

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={categories}
            fullWidth
            filterSelectedOptions
            disableCloseOnSelect
            onChange={(event: any, newValue: ICategory[] | null) => {
                setSelected(newValue);
            }}
            getOptionLabel={(option) => option.name}
            value={selected}
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
                <TextField {...params} label={label} placeholder={placeholder} />
            )}
        />
    )
}
