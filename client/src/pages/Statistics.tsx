import { BarChart } from '@mui/icons-material'
import { Box, Container, Divider, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '../hooks/contextHooks/useAuthContext';
import { fetchAllBookCountsByAuthor, fetchAllBookCountsByCategory, fetchAllBookCountsByStat } from '../apis/statApi';
import { useLibraryDataContext } from '../hooks/contextHooks/useLibraryDataContext';
import PolarAreaChart from '../data/charts/PolarAreaChart';

export default function Statistics() {
    const { user } = useAuthContext();
    const { books, dispatch } = useLibraryDataContext();
    const [bookCountByAuthor, setBookCountByAuthor] = useState<any>();
    const [bookCountByCategory, setBookCountByCategory] = useState<any>();

    // Author Menu
    const [authorMenu, setAuthorMenu] = useState("Most Frequent");
    const [authorLimit, setAuthorLimit] = useState(10);

    /**
     * 
     * @returns Component for Author Select
     */
    const AuthorSelect = () => {
        const handleChange = (event: SelectChangeEvent) => {
            setAuthorMenu(event.target.value as string);
        };
        return (
            <FormControl sx={{ m: 0.5, minWidth: 80 }}>
                <Select
                    labelId="authorMenuLabel"
                    id="authorMenuSelect"
                    value={authorMenu}
                    onChange={handleChange}
                >
                    <MenuItem value={"Most Frequent"}>Most Frequent</MenuItem>
                    <MenuItem value={"Least Frequent"}>Least Frequent</MenuItem>
                    <MenuItem value={"Select Manually"}>Select Manually</MenuItem>
                </Select>
            </FormControl>
        )
    };

    const FrequencySelect = () => {
        const handleChange = (event: SelectChangeEvent) => {
            const num = parseInt(event.target.value)
            setAuthorLimit(num);
        };
        return (
            <FormControl sx={{ m: 0.5, minWidth: 80 }}>
                <Select
                    labelId="authorMenuLabel"
                    id="authorMenuSelect"
                    value={authorLimit.toString()}
                    onChange={handleChange}
                >
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"15"}>15</MenuItem>
                    <MenuItem value={"20"}>20</MenuItem>
                    <MenuItem value={"25"}>25</MenuItem>
                </Select>
            </FormControl>
        )
    };

    //UseCallBack 
    const fetchStats = useCallback(async () => {
        if (user) {
            const resBook = await fetchAllBookCountsByAuthor(user.id, user.token);
            const resCategory = await fetchAllBookCountsByCategory(user.id, user.token);
            setBookCountByAuthor(resBook);
            setBookCountByCategory(resCategory.slice(0, 10));
        }
    }, [books]);

    const memoizedAuthorStats = useMemo(() => {
        if (!Array.isArray(bookCountByAuthor)) {
            return [];
        }
        if(authorMenu === 'Most Frequent'){
            return bookCountByAuthor.slice(0,authorLimit) || [];
        }
        else if(authorMenu === 'Least Frequent'){
            return bookCountByAuthor.slice(-authorLimit) || [];
        }
        else if(authorMenu === 'Select Manually'){

        }
        else {
            return bookCountByAuthor;
        }
    },[bookCountByAuthor,authorMenu,authorLimit]);
    
    //UseEffect
    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Comparsion By Author */}
                <Grid item xs={12} md={12} lg={6}>

                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 380,
                        }}
                    >
                        {/* Header Section with Dropdowns */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                mb: 2, // Margin bottom for spacing
                            }}
                        >
                            <span>Comparison of Authors</span>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {/* Dropdown 1 */}
                                <AuthorSelect />
                                {/*2*/}
                                {(authorMenu === 'Most Frequent' || authorMenu === 'Least Frequent') && <FrequencySelect/>}
                            </Box>
                        </Box>
                        <PolarAreaChart chartData={memoizedAuthorStats} />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={12} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 300,
                        }}
                    >
                        <PolarAreaChart chartData={bookCountByCategory} />
                    </Paper>
                </Grid>
            </Grid>



        </Container>
    )
}
