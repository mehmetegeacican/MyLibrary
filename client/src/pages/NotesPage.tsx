import { Container, Grid, Paper } from '@mui/material'
import React from 'react'
import TabContent from '../components/tabbar/TabContent'
import Tabbar from '../components/tabbar/Tabbar'
import { CategoryTabs, CategoryTabContents } from '../data/tabs/TabDatas'

export default function NotesPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Highlight Menu */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: 55,
                        }}>
                        
                    </Paper>
                </Grid>
                {/* Table */}
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height:400
                    }}>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
  )
}
