import { BarChart } from '@mui/icons-material'
import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, ListItemText, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '../hooks/contextHooks/useAuthContext';
import { fetchAllBookCountsByAuthor, fetchAllBookCountsByCategory, fetchAllBookCountsByStat } from '../apis/statApi';
import { useLibraryDataContext } from '../hooks/contextHooks/useLibraryDataContext';
import PolarAreaChart from '../data/charts/PolarAreaChart';
import MultipleSelectionAutocomplete from '../components/forms/MultipleSelectionAutocomplete';
import { IAuthor } from '../interfaces/DataInterfaces';

export default function Statistics() {
    const { user } = useAuthContext();
    const { books, authors } = useLibraryDataContext();
    const [bookCountByAuthor, setBookCountByAuthor] = useState<any>();
    const [bookCountByCategory, setBookCountByCategory] = useState<any>();

    const [authorDialogOpen, setAuthorDialogOpen] = useState<boolean>(false);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);


    // Author Menu
    const [authorMenu, setAuthorMenu] = useState("Most Frequent");
    const [authorLimit, setAuthorLimit] = useState(10);

    /**
     * 
     * @returns Component for Author Select
     */
    const AuthorMenuSelect = () => {
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



    const AuthorSelectDialog = () => {
        // Handle change for the Select component
        const handleChangeAuthors = (event: SelectChangeEvent<string[]>) => {
            setSelectedAuthors(event.target.value as string[]);
        };

        return (
            <FormControl sx={{ m: 0.5, minWidth: 220 , maxWidth:220}} fullWidth>
                <Select
                    labelId="authorMenuLabel"
                    id="authorMenuSelect"
                    multiple
                    value={selectedAuthors}
                    onChange={handleChangeAuthors}  // Handle multiple selection
                    renderValue={(selected) => selected.join(', ')} // Display selected authors
                >
                    {memoizedAuthorNames.map((authorName, index) => (
                        <MenuItem key={index} value={authorName}>
                            <Checkbox checked={selectedAuthors.indexOf(authorName) > -1} />
                            <ListItemText primary={authorName} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    //UseCallBack 
    const fetchStats = useCallback(async () => {
        if (user) {
            const resBook = await fetchAllBookCountsByAuthor(user.id, user.token);
            const resCategory = await fetchAllBookCountsByCategory(user.id, user.token);
            setBookCountByAuthor(resBook);
            setBookCountByCategory(resCategory.slice(0, 10));
        }
    }, [books]);


    const memoizedAuthorNames = useMemo<string[]>(() => {
        return authors.map((author: IAuthor) => author.authorName);
    }, [authors]);

    // Memoized Items
    const memoizedAuthorStats = useMemo(() => {
        if (!Array.isArray(bookCountByAuthor)) {
            return [];
        }
        if (authorMenu === 'Most Frequent') {
            return bookCountByAuthor.slice(0, authorLimit) || [];
        }
        else if (authorMenu === 'Least Frequent') {
            return bookCountByAuthor.slice(-authorLimit) || [];
        }
        else if (authorMenu === 'Select Manually') {
            return bookCountByAuthor.filter((stat) => selectedAuthors.includes(stat.author_name));
        }
        else {
            return bookCountByAuthor;
        }
    }, [bookCountByAuthor, authorMenu, authorLimit,selectedAuthors]);





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
                                <AuthorMenuSelect />
                                {/*2*/}
                                {(authorMenu === 'Most Frequent' || authorMenu === 'Least Frequent') && <FrequencySelect />}
                                {(authorMenu === 'Select Manually') && (<AuthorSelectDialog />)}

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
