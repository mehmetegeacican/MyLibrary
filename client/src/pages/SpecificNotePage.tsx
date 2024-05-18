import { Button, Container, Grid, Paper, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/contextHooks/useAuthContext';
import { fetchOneNote } from '../apis/noteApis';
import { INote } from '../interfaces/DataInterfaces';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';


export default function SpecificNotePage() {
    const {id} = useParams();
    const {user} = useAuthContext();
    const [note,setNote] = useState<INote | null>(null);


    const fetchData = useCallback(async () => {
        if(id){
            const result = await fetchOneNote(parseInt(id),user!.token);
            setNote(result);
        }
        else {
            return;
        }
    },[id]);


    useEffect(() => {
        fetchData();
    },[fetchData]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: 70,
                            justifyContent:'center'
                        }}>
                            {note && (
                                <div style={{
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'flex-start',
                                    gap:25,
                                    marginLeft:10
                                }}>
                                    <Typography variant='h5' color={'purple'}>{note.title}</Typography>
                                    <Typography variant='subtitle2' color={'palevioletred'}>Created {dayjs(note.createdAt).format('DD/MM/YYYY')}</Typography>
                                </div>
                                
                            )}
                     
                    </Paper>
                </Grid>
                {/* Search Menu */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: 400,
                            overflowY:'auto',
                            color:'darkgrey'
                        }}>
                           {note &&  
                                <div style={{
                                    marginLeft:10
                                }}>
                                    <ReactMarkdown children={note.content}/>
                                </div> 
                           }
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems:'center',
                            justifyContent:'center',
                            height: 40,
                        }}>
                            <Link to={'/notes'}>
                                <Button color='secondary' variant='text'>Back to Blogs</Button>
                            </Link>
                            
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
