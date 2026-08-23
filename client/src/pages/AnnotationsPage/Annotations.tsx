import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, MenuItem, Paper, Stack, Table, TableFooter, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchRounded, PostAdd } from '@mui/icons-material'
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import { useAuthContext, useLibraryDataContext } from '../../hooks/contextHooks';
import { fetchAllAnnotations } from '../../apis/annotationApis';
import { IAnnotation } from '../../interfaces/DataInterfaces';
import defaultImg from '../../assets/default.jpg';
import { formatDistanceToNow } from 'date-fns';
import { DeleteModal } from '../../components/modals';
import AnnotationAddEditModal from '../../components/modals/AnnotationAddEditModal';
import { QUERY_FILTER_TYPES } from '../../enums/enums';

export default function AnnotationsPage() {
    const [query, setQuery] = useState("");
    const [filterType, setFilterType] = useState(QUERY_FILTER_TYPES.BOOK_NAME);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { libTheme } = useLibraryTheme();
    const { user } = useAuthContext();
    const { annotations, dispatch, annotationTrigger } = useLibraryDataContext();
    const [selectedAnnotation, setSelectedAnnotation] = useState<any | null>(null);

    const [activePage, setActivePage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);


    const PORT = import.meta.env.VITE_IMAGESERVICE_PORT;
    const IMAGE_ADDRESS = `http://localhost:${PORT}/images`;

    const truncateText = (text: string, limit: number) => {
        if (!text) return "...";
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    // Handlers
    const handleChangePage = (
        _: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setActivePage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setActivePage(0);
    };


    const checkWhichRowsToShow = (page: number, rowsPerPage: number, index: number) => {
        let multiplied: number = page * rowsPerPage;
        let check1: boolean = index >= page * rowsPerPage;

        let check2: boolean = index < multiplied + rowsPerPage;

        return check1 && check2;
    }


    const handleUpdateNote = (annotation: IAnnotation) => {
        setOpenAddModal(true);
        setSelectedAnnotation(annotation);
    }

    const handleDeleteAnnotation = (annotation: IAnnotation) => {
        setOpenDeleteModal(true);
        setSelectedAnnotation(annotation);
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        if (selectedAnnotation) {
            setSelectedAnnotation(null);
        }
    }
    const handleCloseAddUpdate = () => {
        setOpenAddModal(false);
        setOpenViewModal(false);
        if (selectedAnnotation) {
            setSelectedAnnotation(null);
        }
    }

    //UseCallBack 
    const fetchData = useCallback(async () => {
        if (user) {
            const res = await fetchAllAnnotations(user.id, user.token);
            dispatch({ type: 'GET_ANNOTATIONS', payload: res });
        }
    }, [annotationTrigger]);



    const memoizedAnnotations = useMemo(() => {
        const FILTER_STRATEGIES: Record<QUERY_FILTER_TYPES, (annotation: IAnnotation, query: string) => boolean> = {
            [QUERY_FILTER_TYPES.BOOK_NAME]: (annotation, query) => annotation.book?.name?.toLowerCase().includes(query.toLowerCase()),
            [QUERY_FILTER_TYPES.AUTHOR_NAME]: (annotation, query) => annotation.book?.authors?.some((author) => author.toLowerCase().includes(query.toLowerCase())),
        };
        if (query !== "") {
            const matches = FILTER_STRATEGIES[filterType];
            return matches ? annotations.filter((annotation) => matches(annotation, query)) : annotations
        }
        else {
            return annotations;
        }

    }, [annotations, query, filterType]);

    //UseEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);


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
                                defaultValue={QUERY_FILTER_TYPES.BOOK_NAME}
                                sx={{
                                    width: '14%'
                                }}
                            >
                                {[{ value: QUERY_FILTER_TYPES.BOOK_NAME, label: 'Book Name' }, { value: QUERY_FILTER_TYPES.AUTHOR_NAME, label: 'Author Name' }].map((option) => (
                                    <MenuItem key={option.value} value={option.value} onClick={() => setFilterType(option.value)}>
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
                        p: 2.7,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 450,
                        overflow: 'auto'
                    }}>
                        <Stack gap={3.2}>
                            <Grid container spacing={2}>
                                {memoizedAnnotations.map((annotation: IAnnotation, index: number) => {
                                    if (checkWhichRowsToShow(activePage, rowsPerPage, index)) {
                                        return (
                                            <Grid key={annotation.id} item xs={12} sm={6} md={4} lg={3}>
                                                <Card
                                                    sx={{
                                                        borderRadius: 4,
                                                        height: 320,
                                                        maxWidth: 320,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >

                                                    <CardActionArea sx={{ flexGrow: 1 }}>
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ height: 160, objectFit: 'cover' }}
                                                            image={annotation?.book?.imagePath ? IMAGE_ADDRESS + "/books/" + annotation?.book?.imagePath : defaultImg}
                                                            title={annotation?.book?.name}
                                                        />
                                                        <CardContent sx={{ p: 2 }}>
                                                            {/* Main Annotation Title */}
                                                            <Box>
                                                                <Typography variant="body2" gutterBottom color={libTheme} sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                                                    {truncateText(annotation?.annotation || "", 100) ?? "Untitled"}
                                                                </Typography>
                                                            </Box>

                                                            {/* Secondary Info */}
                                                            <Box sx={{ mt: 2 }}>
                                                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                                    {annotation?.book?.name}
                                                                </Typography>
                                                                <Typography variant="caption" display="block" color="text.secondary">
                                                                    Page: {annotation?.pageNumber}
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Updated: {formatDistanceToNow(new Date(annotation.updatedat))} ago
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>

                                                    </CardActionArea>
                                                    <CardActions sx={{ p: 1, pt: 0, justifyContent: 'space-evenly', alignItems: 'center' }}>
                                                        <Button size="small" color="success" sx={{ borderRadius: 2 }} onClick={() => {
                                                            setSelectedAnnotation(annotation);
                                                            setOpenViewModal(true);
                                                        }}>
                                                            Read
                                                        </Button>
                                                        <Button size="small" color="info" sx={{ borderRadius: 2 }} onClick={() => handleUpdateNote(annotation)}>
                                                            Edit
                                                        </Button>
                                                        <Button size="small" color="error" sx={{ borderRadius: 2 }} onClick={() => handleDeleteAnnotation(annotation)}>
                                                            Delete
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        )
                                    }
                                })}
                                {memoizedAnnotations.length === 0 && (
                                    <Grid item xs={12} spacing={2} height={320} display="flex" justifyContent="center" alignItems="center">
                                        <Typography variant="body1" color="text.secondary" align="center">
                                            No annotations found.
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                            <Table>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[4, 8, 12]}
                                            colSpan={100}
                                            count={memoizedAnnotations.length}
                                            rowsPerPage={rowsPerPage}
                                            page={activePage}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            sx={{ justifyContent: 'center' }}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Stack>

                        {<AnnotationAddEditModal open={openAddModal} handleClose={() => handleCloseAddUpdate()} annotation={selectedAnnotation} viewOnly={false} />}
                        {selectedAnnotation && <DeleteModal open={openDeleteModal} handleClose={() => handleCloseDeleteModal()} data={selectedAnnotation} />}
                        {<AnnotationAddEditModal open={openViewModal} handleClose={() => handleCloseAddUpdate()} annotation={selectedAnnotation} viewOnly={true} />}
                    </Paper>
                </Grid>

            </Grid>
        </Container>

    )
}