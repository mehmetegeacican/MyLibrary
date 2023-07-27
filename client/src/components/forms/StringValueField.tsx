import { TextField } from '@mui/material'
import React from 'react'


interface TextFieldInterface {
    label: string;
    data: string;
    setter: Function;
}

export default function StringValueField({ label, data, setter }: TextFieldInterface) {
    //Handlers
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    }
    return (
        <TextField id="StringField" label={label}
            value={data} variant="outlined"
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInput(event);
            }} />
    )
}
