import { Container, Grid, Paper } from '@mui/material'
import Tabbar from '../components/tabbar/Tabbar'
import React from 'react'
import TabContent from '../components/tabbar/TabContent';
import {CategoryTabContents, CategoryTabs } from '../data/tabs/TabDatas';


export default function CategoriesPage() {
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
                        <Tabbar tabElements={CategoryTabs} tabValue={tabValue} setTabValue={setTabValue} />
                    </Paper>
                </Grid>
                {/* Table */}
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TabContent value={tabValue} items={CategoryTabContents}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
