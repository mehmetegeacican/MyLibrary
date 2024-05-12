import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { SearchRounded } from '@mui/icons-material'
import { useLibraryDataContext } from '../hooks/contextHooks/useLibraryDataContext'
import { INote } from '../interfaces/DataInterfaces'
import defaultImg from '../assets/default.jpg';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DeleteModal from '../components/modals/DeleteModal';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { fetchAllNotes } from '../apis/noteApis';
import { useAuthContext } from '../hooks/contextHooks/useAuthContext';
import NoteAddEditModal from '../components/modals/NoteAddEditModal';


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
    const { notes, dispatch, noteTrigger } = useLibraryDataContext();
    const { user } = useAuthContext();
    const [deleteModal, setDeleteModal] = useState(false);
    const [openAddModal,setOpenAddModal] = useState(false);

    //UseCallBack 
    const fetchData = useCallback(async () => {
        if (user) {
            const res = await fetchAllNotes(user.id, user.token);
            dispatch({ type: 'GET_NOTES', payload: res });
        }
    }, [noteTrigger]);

    //UseEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const memoizedNotes = useMemo(() => {
        return notes;
    },[notes]);
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
                                placeholder='Search Notes by Title'
                                InputProps={{
                                    startAdornment: (
                                        <SearchRounded sx={{ mr: 1.5, color: 'text.disabled' }} /> // Render the search icon as a start adornment
                                    ),
                                }}
                                sx={{
                                    width: '80%'
                                }}
                                color="secondary"
                            />
                            <TextField
                                select
                                label="Filter based on"
                                color='secondary'
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
                            <Button color='secondary' variant='text' onClick={() => setOpenAddModal(true)}><PostAddIcon /></Button>
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
                            {memoizedNotes.map((note: INote) => (
                                <Grid key={note.id} item xs={12} sm={6} md={4}>
                                    <Card sx={{ borderRadius: 5 }}>
                                        <CardActionArea >
                                            <CardMedia
                                                sx={{ height: 140, borderRadius: 2 }}
                                                image={defaultImg}
                                                title="card image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" color={'secondary'}>
                                                    {note.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Last updated : {note.updatedAt.toString()}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions sx={{ justifyContent: 'center' }}>
                                            <Button size="small" color="success">
                                                Read more
                                            </Button>
                                            <Button size="small" color="info">
                                                Edit
                                            </Button>
                                            <Button size="small" color="error" onClick={() => setDeleteModal(true)}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                    {<DeleteModal open={deleteModal} handleClose={() => setDeleteModal(false)} data={note!} />}
                                </Grid>
                            ))}
                           {<NoteAddEditModal open={openAddModal} handleClose={() => setOpenAddModal(false)} mode='add'/> } 
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        </Container>
    )
}
