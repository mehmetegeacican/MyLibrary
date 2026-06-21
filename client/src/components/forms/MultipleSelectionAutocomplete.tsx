import { Autocomplete, Checkbox, TextField } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IAuthor, IBook, ICategory } from '../../interfaces/DataInterfaces';
import { isIAuthor, isIBook, isICategory } from '../tables/DataRow';


type IDataSet = ICategory | IAuthor | IBook; // Extend this union type if you want to use this component for other datasets as well

interface AutocompleteInterface {
    label: string;
    placeholder: string;
    dataset: IDataSet[] ;
    selected: IDataSet[];
    setSelected: Function;
}

export default function MultipleSelectionAutocomplete({ label, placeholder, dataset, selected, setSelected }: AutocompleteInterface) {

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={dataset}
            fullWidth
            filterSelectedOptions
            disableCloseOnSelect
            onChange={(_: any, newValue: IDataSet[] | null) => {
                setSelected(newValue);
            }}
            getOptionLabel={(option) => {
                if(isICategory(option)){
                    return option.name
                }
                else if(isIAuthor(option)){
                    return option.authorName
                }
                else if(isIBook(option)){
                    return option.name
                }
                return "";
            }}
            value={selected}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {isIAuthor(option) && option.authorName}
                    {isICategory(option) && option.name}
                    {isIBook(option) && option.name}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} />
            )}
        />
    )
}
