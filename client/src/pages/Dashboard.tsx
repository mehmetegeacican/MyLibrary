import { Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { useLibraryDataContext } from '../hooks/contextHooks/useLibraryDataContext'
import BarChart from '../data/charts/BarChart';
import { useCallback, useEffect, useMemo } from 'react';

import { fetchAllBookCountsByAuthor, fetchAllBookCountsByCategory, fetchAllBookCountsByStat } from '../apis/statApi';
import React from 'react';
import DougnutChart from '../data/charts/DougnutChart';
import { IBookByAuthorStat } from '../interfaces/DataInterfaces';
import { useAuthContext } from '../hooks/contextHooks/useAuthContext';
import { fetchAllBooks } from '../apis/bookApi';
import { fetchAllCategories } from '../apis/categoryApi';
import { fetchAllAuthors } from '../apis/authorApi';

export default function Dashboard() {
    //Hooks & Context
    const { user } = useAuthContext();
    const { books, categories, authors, dispatch } = useLibraryDataContext();
    const [bookCountByAuthor, setBookCountByAuthor] = React.useState<IBookByAuthorStat[]>();
    const [bookCountByCategory, setBookCountByCategory] = React.useState<any>();
    const [bookCountByStat, setBookCountByStat] = React.useState<any>();
    //UseCallBack 
    const fetchStats = useCallback(async () => {
        if (user) {
            const resBook = await fetchAllBookCountsByAuthor(user.id);
            const resCategory = await fetchAllBookCountsByCategory(user.id);
            const resStat = await fetchAllBookCountsByStat(user.id);
            setBookCountByAuthor(resBook.slice(0, 12));
            setBookCountByCategory(resCategory.slice(0, 10));
            setBookCountByStat(resStat);
        }
    }, [books]);

    const fetchDatas = useCallback(async () => {
        if (user) {
            const bookDatas = await fetchAllBooks(user.id);
            const categoryDatas = await fetchAllCategories(user.id);
            const resAuthors = await fetchAllAuthors(user.id);
            dispatch({ type: 'GET_AUTHORS', payload: resAuthors! });
            dispatch({ type: 'GET_BOOKS', payload: bookDatas });
            dispatch({ type: 'GET_CATEGORIES', payload: categoryDatas });
        }
    }, [user])

    //UseEffect
    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    useEffect(() => {
        fetchDatas();
    }, [fetchDatas]);

    //Filter Method for not including multiple in the stats
    const filteredBookStats = useMemo(() => {
        if (bookCountByAuthor) {
            return bookCountByAuthor.filter((item: IBookByAuthorStat) => {
                return item.author !== "Multiple" && item.author !== "Me";
            })
        }
        return [];
    }, [bookCountByAuthor]);

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
                        {bookCountByAuthor && <BarChart chartData={filteredBookStats} />}
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
                        <Stack spacing={2} divider={<Divider />}  >
                            <Typography variant='h6' color={'primary'}> {books.length} Books </Typography>
                            <Typography variant='h6' color={'secondary'}> {authors.length} Authors </Typography>
                            <Typography variant='h6' color={'primary'}> {categories.length} Categories</Typography>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        {bookCountByAuthor && <BarChart chartData={bookCountByCategory} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 0.3,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Stack spacing={1} >
                            <div>
                                <DougnutChart chartData={bookCountByStat} />
                            </div>

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
