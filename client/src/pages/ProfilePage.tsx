import { Container, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { SignUpForm } from './SignUpPage'

export default function ProfilePage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 270,
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
                            marginBottom:2
                        }} variant='h6' color={'secondary'}> Select Theme Color </Typography>
                        <RadioGroup name="use-radio-group" defaultValue="secondary">
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <FormControlLabel value="primary" control={<Radio  color='primary' size='medium'/>} label="Blue" />
                                <FormControlLabel value="secondary" control={<Radio  color='secondary' size='medium'/>} label="Purple" />
                                <FormControlLabel value="success" control={<Radio  color='success' size='medium'/>} label="Green" />
                                <FormControlLabel value="danger" control={<Radio  color='error' size='medium'/>} label="Red" />
                                <FormControlLabel value="warning" control={<Radio  color='warning' size='medium'/>} label="Orange" />
                            </div>

                        </RadioGroup>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
