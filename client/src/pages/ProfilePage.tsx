import { Container, Grid, Paper } from '@mui/material'
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
                    </Paper>
                </Grid>
            </Grid>
        </Container>
  )
}
