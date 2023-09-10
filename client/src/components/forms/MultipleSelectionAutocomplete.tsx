import { Autocomplete, Checkbox, TextField } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IAuthor, ICategory } from '../../interfaces/DataInterfaces';
import { isIAuthor, isICategory } from '../tables/DataRow';


type IDataSet = ICategory | IAuthor;

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
            onChange={(event: any, newValue: IDataSet[] | null) => {
                setSelected(newValue);
            }}
            getOptionLabel={(option) => {
                if(isICategory(option)){
                    return option.name
                }
                else if(isIAuthor(option)){
                    return option.authorName
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
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} />
            )}
        />
    )
}
