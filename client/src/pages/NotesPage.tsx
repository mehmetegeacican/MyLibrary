import { Container, Grid, InputAdornment, MenuItem, Paper, Select, TextField } from '@mui/material'
import React from 'react'
import TabContent from '../components/tabbar/TabContent'
import Tabbar from '../components/tabbar/Tabbar'
import { CategoryTabs, CategoryTabContents } from '../data/tabs/TabDatas'
import { SearchRounded } from '@mui/icons-material'


const currencies = [
    {
        value: '0',
        label: 'All',
    },
    {
        value: '1',
        label: 'Day',
    },
    {
        value: '7',
        label: 'Week',
    },
    {
        value: '30',
        label: 'Month',
    },
];



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
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2
                        }}>
                            <TextField
                                placeholder='Search Notes by Title'
                                InputProps={{
                                    startAdornment: (
                                        <SearchRounded sx={{ mr: 1.5, color: 'text.disabled' }} /> // Render the search icon as a start adornment
                                    ),
                                }}
                                sx={{
                                    width:'80%'
                                }}
                                color="secondary"
                            />
                            <TextField
                                select
                                label="Filter based on"
                                color='secondary'
                                defaultValue="0"
                                sx={{
                                    width:'20%'
                                }}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                    </Paper>
                </Grid>
                {/* Table */}
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 400
                    }}>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
