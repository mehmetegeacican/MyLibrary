import { Container, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext'
import ProfileForm from '../../data/forms/ProfileForm';
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import { updateUser } from '../../apis/userApis';

export default function ProfilePage() {

    const { user ,dispatch } = useAuthContext();
    const {libTheme} = useLibraryTheme();


    const handleColorSwitch = async (e: { target: { value: any; }; }) => {
        dispatch({
            type: 'SET_THEME_COLOR',
            payload: e.target.value
        });
        if(user?.id && user){
            await updateUser(user?.id.toString(),{theme_color:e.target.value},user?.token);
        }
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            height: 270
                        }}
                    >
                        <ProfileForm />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 120,
                        }}
                    >
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 120,
                        }}
                    >
                        <Typography sx={{
                            marginBottom: 2
                        }} variant='h6' color={libTheme}> Select Theme Color </Typography>
                        <RadioGroup name="use-radio-group" value={libTheme} onChange={handleColorSwitch}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <FormControlLabel value="primary" control={<Radio color='primary' size='medium' />} label="Blue" />
                                <FormControlLabel value="secondary" control={<Radio color='secondary' size='medium' />} label="Purple" />
                                <FormControlLabel value="success" control={<Radio color='success' size='medium' />} label="Green" />
                                <FormControlLabel value="error" control={<Radio color='error' size='medium' />} label="Red" />
                                <FormControlLabel value="warning" control={<Radio color='warning' size='medium' />} label="Orange" />
                            </div>

                        </RadioGroup>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
