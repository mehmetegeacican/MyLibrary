import { TextField } from '@mui/material'
import React from 'react'
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';


interface TextFieldInterface {
    label: string;
    data: string;
    setter: Function;
    password?: boolean;
}

export default function StringValueField({ label, data, setter, password }: TextFieldInterface) {
    const {libTheme} = useLibraryTheme();
    //Handlers
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    }
    return (
        <TextField id={"StringField" + label} label={label}
            value={data} variant="outlined"
            color={libTheme}
            fullWidth
            type = {password ? 'password': 'text'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInput(event);
            }} />
            
    )
}
