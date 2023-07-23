import { Container, Grid, Paper } from '@mui/material'
import Tabbar from '../components/tabbar/Tabbar'
import  {  BookTabContents, BookTabs } from '../components/tabbar/data/BookTabs'
import React from 'react'
import TabContent from '../components/tabbar/TabContent';

export default function Statistics() {
    //State
    const [tabValue, setTabValue] = React.useState<number>(0);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Highlight Menu */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: 74,
                        }}>
                        <Tabbar tabElements={BookTabs} tabValue={tabValue} setTabValue={setTabValue} />
                    </Paper>
                </Grid>
                {/* Table */}
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TabContent value={tabValue} items={BookTabContents}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
