import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { SearchRounded } from '@mui/icons-material'
import { useLibraryDataContext } from '../../hooks/contextHooks/useLibraryDataContext'
import { INote } from '../../interfaces/DataInterfaces'
import defaultImg from '../../assets/default.jpg';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DeleteModal from '../../components/modals/DeleteModal';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { fetchAllNotes } from '../../apis/noteApis';
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext';
import NoteAddEditModal from '../../components/modals/NoteAddEditModal';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import {currencies} from "./data/NotesData";




export default function NotesPage() {
    const { notes, dispatch, noteTrigger } = useLibraryDataContext();
    const { user } = useAuthContext();
    const [deleteModal, setDeleteModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);
    const [query, setQuery] = useState("");
    const {libTheme} = useLibraryTheme();

    const PORT = import.meta.env.VITE_IMAGESERVICE_PORT;
    const IMAGE_ADDRESS = `http://localhost:${PORT}/images`;

    //Handlers
    const handleDeleteNote = (note: INote) => {
        setDeleteModal(true);
        setSelectedNote(note)
    }


    const handleUpdateNote = (note: INote) => {
        setOpenAddModal(true);
        setSelectedNote(note);
    }

    const handleCloseAddUpdate = () => {
        setOpenAddModal(false);
        if (selectedNote) {
            setSelectedNote(null);
        }
    }

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
        if (query !== "") {
            return notes.filter((note: INote) => note.title.toLowerCase().includes(query.toLowerCase()));
        }
        else {
            return notes;
        }

    }, [notes, query]);
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
                            <Button color={libTheme ?? 'secondary'} variant='text' onClick={() => setOpenAddModal(true)}><PostAddIcon /></Button>
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
                                <Grid key={note.id} item xs={12} sm={12} md={6} lg={4}>
                                    <Card sx={{ borderRadius: 5 , minHeight:300}}>
                                        <Link to={'/notes/' + note.id}>
                                            <CardActionArea >
                                                <CardMedia
                                                    sx={{ height: 140, borderRadius: 2 }}
                                                    image={note.imagePath ? IMAGE_ADDRESS + "/notes/" + note.imagePath : defaultImg}
                                                    title="card image"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div" color={libTheme}>
                                                        {note.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Last updated : {formatDistanceToNow(note.updatedAt.toString())} ago
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Link>

                                        <CardActions sx={{ justifyContent: 'center' }}>
                                            <Link to={'/notes/' + note.id}>
                                                <Button size="small" color="success">
                                                    Read more
                                                </Button>
                                            </Link>

                                            <Button size="small" color="info" onClick={() => handleUpdateNote(note)}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleDeleteNote(note)}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                            {<NoteAddEditModal open={openAddModal} handleClose={() => handleCloseAddUpdate()} note={selectedNote} />}
                            {selectedNote && <DeleteModal open={deleteModal} handleClose={() => setDeleteModal(false)} data={selectedNote} />}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        </Container>
    )
}
