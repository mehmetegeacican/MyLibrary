import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react';
import { SearchRounded, PostAdd } from '@mui/icons-material'
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import { useAuthContext, useLibraryDataContext } from '../../hooks/contextHooks';
import { fetchAllAnnotations } from '../../apis/annotationApis';

export default function AnnotationsPage() {
    const [query, setQuery] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false);
    const { libTheme } = useLibraryTheme();
    const { user } = useAuthContext();
    const { annotations, dispatch, annotationTrigger } = useLibraryDataContext();
    const [selectedAnnotation, setSelectedAnnotation] = useState<any | null>(null);

    const PORT = import.meta.env.VITE_IMAGESERVICE_PORT;
    const IMAGE_ADDRESS = `http://localhost:${PORT}/images`;

    //UseCallBack 
    const fetchData = useCallback(async () => {
        if (user) {
            const res = await fetchAllAnnotations(user.id, user.token);
            dispatch({ type: 'GET_ANNOTATIONS', payload: res });
        }
    }, [annotationTrigger]);


    //UseEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        console.log("Annotations " , annotations);
    }, [annotations]);


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
                                placeholder='Search Annotations by Book Name or Author Name'
                                InputProps={{
                                    startAdornment: (
                                        <SearchRounded sx={{ mr: 1.5, color: 'text.disabled' }} /> // Render the search icon as a start adornment
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
                                {[{ value: '0', label: 'Book Name' }, { value: '1', label: 'Author Name' }].map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button color={libTheme ?? 'secondary'} variant='text' onClick={() => setOpenAddModal(true)}><PostAdd /></Button>
                        </div>

                    </Paper>
                </Grid>
                {/* Card List */}
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 450,
                        overflow: 'auto'
                    }}>
                        <Grid container spacing={2}>


                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    )
}