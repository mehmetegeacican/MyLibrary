
import { Alert, Button, Container, Grid, IconButton, Paper, Stack, Typography, } from '@mui/material';
import React, { useState } from 'react';
import { Fragment } from 'react';
import StringValueField from '../components/forms/StringValueField';
import { useAuthForms } from '../hooks/formHooks/useAuthForms';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface IAuthForm {
    name: string;
    setName: Function;
    password: string;
    setPassword: Function;
}

export const LoginForm = ({ name, setName, password, setPassword }: IAuthForm) => {
    //Hooks & Contexts
    const { loginUser, error, message } = useAuthForms();
    const [passwVisible, setPasswVisible] = useState(true);

    //Submit
    const submit = async () => {
        await loginUser(name, password);
    }

    //Render
    return (
        <Fragment>
            <Stack spacing={2} alignContent={"center"}>
                <Typography variant='h5' color={'primary'}> Login </Typography>
                <Stack spacing={2} direction={'row'}>
                    <StringValueField label={'Enter Email'} data={name} setter={setName} />
                    <StringValueField label={'Enter Password'} data={password} setter={setPassword} password={passwVisible} />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setPasswVisible(!passwVisible)}
                        edge="end"
                    >
                        {passwVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </Stack>
                <Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={async () => submit()}> Login </Button>
                {error && <Alert sx={{ mb: 2 }} severity="error"> {message}</Alert>}
            </Stack>
        </Fragment>

    );
}


export default function LoginPage() {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <LoginForm name={username} setName={setUsername} password={password} setPassword={setPassword} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
