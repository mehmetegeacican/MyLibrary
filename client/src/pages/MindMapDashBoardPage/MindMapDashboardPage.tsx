import { SearchRounded } from '@mui/icons-material'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext';
import { useLibraryDataContext } from '../../hooks/contextHooks/useLibraryDataContext';
import { IMindMap } from '../../interfaces/DataInterfaces';
import { formatDistanceToNow } from 'date-fns';
import defaultImg from '../../assets/default.jpg';
import { Link } from 'react-router-dom';


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


export default function MindMapDashboardPage() {

    const { libTheme } = useLibraryTheme();
    const { user } = useAuthContext();
    const { mindMaps, dispatch, mindMapTrigger } = useLibraryDataContext();
    const [query, setQuery] = useState("");

    const PORT = import.meta.env.VITE_IMAGESERVICE_PORT;
    const IMAGE_ADDRESS = `http://localhost:${PORT}/images`;

    const memoizedMindMaps = useMemo(() => {

        if (query !== "") {
            return mindMaps.filter((item: IMindMap) => item.title.toLowerCase().includes(query.toLowerCase()));
        }
        else {
            return mindMaps;
        }

    }, [mindMaps, query]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Search Menu */}
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
                                placeholder='Search Mind Maps by Title'
                                InputProps={{
                                    startAdornment: (
                                        <SearchRounded sx={{ mr: 1.5, color: 'text.disabled' }} />
                                    ),
                                }}
                                sx={{
                                    width: '80%'
                                }}
                                color={libTheme}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <TextField
                                select
                                label="Filter based on"
                                color={libTheme}
                                defaultValue="0"
                                sx={{
                                    width: '14%'
                                }}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button color={libTheme ?? 'secondary'} variant='text' onClick={() => console.log("aaa")}><PostAddIcon /></Button>
                        </div>

                    </Paper>
                </Grid>
                {/* Maps Menu */}
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 450,
                        overflow: 'auto'
                    }}>
                        <Grid container spacing={2}>
                            {memoizedMindMaps.map((map: IMindMap) => (
                                <Grid key={map.id} item xs={12} sm={12} md={6} lg={4}>
                                    <Card sx={{ borderRadius: 5, minHeight: 300 }}>
                                        <Link to={'/mindmap/' + map.id}>
                                            <CardActionArea >
                                                <CardMedia
                                                    sx={{ height: 140, borderRadius: 2 }}
                                                    image={defaultImg}
                                                    title="card image"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div" color={libTheme}>
                                                        {map.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Last updated :  ago
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Link>
                                        <CardActions sx={{ justifyContent: 'center' }}>
                                            <Button size="small" color="error" onClick={() => console.log("zz")}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        </Container>
    )
}
