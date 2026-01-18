import { Container, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext';
import { fetchAllBookCountsByAuthor, fetchAllBookCountsByCategory, fetchAllLikedAvgByAuthor, fetchAllLikedAvgByCategory } from '../../apis/statApi';
import { useLibraryDataContext } from '../../hooks/contextHooks/useLibraryDataContext';
import PolarAreaChart from '../../data/charts/PolarAreaChart';
import { IAuthor } from '../../interfaces/DataInterfaces';
import BarChart from '../../data/charts/BarChart';
import DougnutChart from '../../data/charts/DougnutChart';
import ComparisonChart from '../../components/comparisonChart/comparisonChart';

export default function Statistics() {
    const { user } = useAuthContext();
    const { books, authors } = useLibraryDataContext();
    const [bookCountByAuthor, setBookCountByAuthor] = useState<any>();
    const [bookCountByCategory, setBookCountByCategory] = useState<any>();
    const [likedAvgByAuthor, setLikedAvgByAuthor] = useState<any>();
    const [likeAvgByCategory,setLikeAvgByCategory] = useState<any>();
    const [graphT, setGraphT] = useState<string>("Polar Area");

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

                </Select>
            </FormControl>
        )
    };

    /**
     * 
     * @returns Component for Author Select
     */
    const GraphTypeSelect = () => {
        const handleChange = (event: SelectChangeEvent) => {
            setGraphT(event.target.value as string);
        };
        return (
            <FormControl sx={{ m: 0.5, minWidth: 80 }}>
                <Select
                    labelId="authorMenuLabel"
                    id="authorMenuSelect"
                    value={graphT}
                    onChange={handleChange}
                >
                    <MenuItem value={"Bar"}>Bar Graph</MenuItem>
                    <MenuItem value={"Dougnut"}>Dougnut Chart</MenuItem>
                    <MenuItem value={"Polar Area"}>Polar Area</MenuItem>

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
            const resAvgAuthor = await fetchAllLikedAvgByAuthor(user.id, user.token);
            const resAvgCategory = await fetchAllLikedAvgByCategory(user.id,user.token);
            setBookCountByAuthor(resBook);
            setBookCountByCategory(resCategory);
            setLikedAvgByAuthor(resAvgAuthor);
            setLikeAvgByCategory(resAvgCategory);
        }
    }, [books]);


    const memoizedAuthorNames = useMemo<string[]>(() => {
        return authors.map((author: IAuthor) => author.authorName);
    }, [authors, authorMenu]);

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
    }, [bookCountByAuthor, authorMenu, authorLimit, selectedAuthors]);





    //UseEffect
    useEffect(() => {
        fetchStats();
    }, [fetchStats]);


    const Graph = () => {
        if (graphT === 'Bar') {
            return <BarChart chartData={memoizedAuthorStats} />
        }
        else if (graphT === 'Dougnut') {
            return <DougnutChart chartData={memoizedAuthorStats} />
        }
        else {
            return <PolarAreaChart chartData={memoizedAuthorStats} />
        }

    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Comparsion By Author */}
                <Grid item xs={12} md={12} lg={6} sx={{
                    padding:4
                }}>

                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 380,
                        }}
                    >
                        {/* Header Section with Dropdowns */}
                        <span style={{ marginBottom: 2 }}>Comparison By Author </span>
                        <ComparisonChart dataCounts={bookCountByAuthor ?? []} />
                    </Paper>
                </Grid>

                {/* Comparison By Category */}
                <Grid item xs={12} md={12} lg={6} sx={{
                    padding:4
                }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 380,
                        }}
                    >
                        <span style={{ marginBottom: 2 }}>Comparison By Category </span>
                        <ComparisonChart dataCounts={bookCountByCategory ?? []} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={12} lg={6} sx={{
                    padding:4
                }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 380,
                        }}
                    >
                        {/* Header Section with Dropdowns */}
                        <span style={{ marginBottom: 2 }}>Average Like Comparison of Authors </span>
                        <ComparisonChart dataCounts={likedAvgByAuthor ?? []} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={12} lg={6} sx={{
                    padding:4
                }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 380,
                        }}
                    >
                        {/* Header Section with Dropdowns */}
                        <span style={{ marginBottom: 2 }}>Average Like Comparison of Categories </span>
                        <ComparisonChart dataCounts={likeAvgByCategory ?? []} />
                    </Paper>
                </Grid>

            </Grid>



        </Container>
    )
}
