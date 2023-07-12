import { Container, Grid, Paper } from '@mui/material'

export default function Statistics() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Highlight Menu */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 70,
                        }}>

                    </Paper>
                </Grid>
                {/* Table */}
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
