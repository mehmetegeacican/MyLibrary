import { Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { useLibraryDataContext } from '../hooks/contextHooks/useLibraryDataContext'

export default function Dashboard() {
    //Hooks & Context
    const {books} = useLibraryDataContext();
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >

                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Stack spacing={2} divider={<Divider/>}  >
                            <Typography variant='h6'  color={'primary'}> {books.length} Books </Typography>
                            <Typography variant='h6' color={'secondary'}>  Authors </Typography>
                            <Typography variant='h6'  color={'primary'}> Categories</Typography>
                        </Stack>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
