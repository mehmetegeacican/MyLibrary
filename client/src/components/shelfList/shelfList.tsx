
import { Button, Container, Stack, Grid, TablePagination, Avatar, Typography, darken, Dialog, DialogTitle, DialogContent, IconButton, Box, Rating, TableFooter, TableRow, Table } from '@mui/material';
import { useState, useMemo, useEffect, useCallback } from 'react'
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import { useAuthContext, useLibraryDataContext } from '../../hooks/contextHooks';
import { IBook } from '../../interfaces/DataInterfaces';
import { FilterModal, UpdateModal, ExportModal, ImportModal, DeleteModal } from '../modals';
import { BookForm } from '../../data/forms/CreateAndUpdateForms';
import { fetchAllBooks } from '../../apis/bookApi';
import { Image } from 'antd';
import ExportIcon from '@mui/icons-material/GetApp';
import ImportIcon from '@mui/icons-material/FileUpload';
import { InfoOutlined, Book , Edit, FilterList, FavoriteBorder, Favorite, Delete, PostAdd} from '@mui/icons-material'

const checkWhichRowsToShow = (page: number, rowsPerPage: number, index: number) => {
    let multiplied: number = page * rowsPerPage;
    let check1: boolean = index >= page * rowsPerPage;

    let check2: boolean = index < multiplied + rowsPerPage;

    return check1 && check2;
}


const CreateBookModel = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='md'
        >
            <DialogTitle id="alert-dialog-title">
                <Stack direction='row' justifyContent={'space-between'}>
                    <Typography color={'info'} variant="h6"> Create </Typography>
                    <Button onClick={handleClose}>Cancel</Button>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <BookForm format={'create'} />
            </DialogContent>
        </Dialog>

    )
}

export default function Shelflist() {
    const { libTheme } = useLibraryTheme();
    const { user, plan } = useAuthContext();
    const { books, bookTrigger, dispatch } = useLibraryDataContext();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [filterChips, setFilterChips] = useState<string[]>([]);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openExport, setOpenExport] = useState<boolean>(false);
    const [openImport, setOpenImport] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

    //Handlers
    const handleChangePage = (
        _: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchData = useCallback(async () => {
        if (user) {
            const res = await fetchAllBooks(user.id, user.token);
            dispatch({ type: 'GET_BOOKS', payload: res });
        }
    }, [bookTrigger]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const avatarColor = useMemo(() => {
        switch (libTheme) {
            case 'primary':
                return '#2196f3';
            case 'secondary':
                return '#9c27b0';
            case 'success':
                return '#4caf50';
            case 'error':
                return '#c62828';
            case 'warning':
                return '#ff6f00';
            default:
                return 'blueviolet'
        }
    }, [libTheme]);


    const filteredBooks = useMemo(() => {
        setPage(0);
        if (!filterChips.length) return books; // If no filters, return all books

        return books.filter((book) => {
            return filterChips.every((chip) => {
                const [filterType, filterValue] = chip.split('-');

                switch (filterType) {
                    case 'Name':
                        return book.name.includes(filterValue);
                    case 'Author':
                        return book.authors.includes(filterValue);
                    case 'Categories':
                        return book.category.includes(filterValue);
                    case 'Language':
                        return book.language?.includes(filterValue);
                    case 'Status':
                        return book.status === filterValue;
                    // Add more cases for other filters if needed
                    default:
                        return true; // If filter type doesn't match, include the book
                }
            });
        });
    }, [books, filterChips, bookTrigger]); // Include books and filterChips in dependencies

    return (
        <Container>
            <Stack gap={5}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    gap: 1
                }}>
                    {/*<TextField
                        placeholder='Search Books by Title, Author'
                        InputProps={{
                            startAdornment: (
                                <SearchRounded sx={{ mr: 1.5, color: 'text.disabled' }} /> // Render the search icon as a start adornment
                            ),
                        }}
                        sx={{
                            width: '70%'
                        }}
                        color={libTheme}
                        onChange={(e) => setQuery(e.target.value)}
                    />*/}
                    <Button color={'info'} variant='text' onClick={() => setOpenFilter(true)}><FilterList /></Button>
                    <Button color={'success'} variant='text' onClick={() => setOpenExport(true)}><ExportIcon /></Button>
                    <Button color={'secondary'} variant='text' onClick={() => setOpenImport(true)}><ImportIcon /></Button>
                    <Button color={libTheme} variant='text' onClick={() => setOpenAdd(true)}><PostAdd /></Button>
                    {/*<Button color={'error'} variant='text' onClick={() => console.log("aaa")}><DeleteIcon /></Button>*/}
                </div>
                <div>
                    <Grid container spacing={2} style={{
                        height: 353,
                        overflowY: 'auto',
                        scrollbarWidth: 'none'
                    }}>
                        {filteredBooks.map((book: IBook, index: number) => {
                            if (checkWhichRowsToShow(page, rowsPerPage, index)) {
                                if (book.imagePath) {
                                    return (
                                        <Grid item xs={6} md={3} lg={2} key={book.id}>

                                            <Image
                                                src={`http://localhost:4008/images/books/${book.imagePath}`}
                                                width={150}
                                                height={238}
                                            />

                                            <Rating
                                                name="liked"
                                                value={parseInt(book.liked ?? "0")}
                                                readOnly
                                                size="small"
                                                icon={<Favorite fontSize="inherit" />}
                                                emptyIcon={<FavoriteBorder fontSize="inherit" />}
                                                sx={{
                                                    color: 'red',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    mt: 1,
                                                    mb: 0.7,
                                                    mr: 1.4
                                                }}
                                            />
                                            {plan === 'pro' && <Rating
                                                name="influence"
                                                value={parseInt(book.influence ?? "0")}
                                                readOnly
                                                size="small"
                                                sx={{
                                                    color: 'skyblue',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    mt: 1,
                                                    mb: 0.7,
                                                    mr: 1.4
                                                }}
                                            />}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 0.1, marginRight: 1.8 }}>
                                                <IconButton aria-label="delete" color='info'>
                                                    <InfoOutlined />
                                                </IconButton>
                                                <IconButton aria-label="edit" color='primary' sx={{
                                                    height: 40,
                                                    width: 40
                                                }} onClick={() => {
                                                    setSelectedBook(book);
                                                    setOpenUpdate(true);

                                                }}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton aria-label="delete" color='error' onClick={() => {
                                                    setSelectedBook(book);
                                                    setOpenDelete(true);

                                                }}>
                                                    <Delete />
                                                </IconButton>
                                            </Box>

                                        </Grid>
                                    )

                                }
                                else {
                                    return (
                                        <Grid item xs={6} md={4} lg={2}>
                                            <Avatar onClick={() => {
                                                setSelectedBook(book);
                                                setOpenUpdate(true);

                                            }}
                                                sx={{
                                                    width: 150,
                                                    height: 238,
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: avatarColor,
                                                    '&:hover': {
                                                        backgroundColor: darken(avatarColor, 0.2), // Use darken function from @mui/system
                                                    }
                                                }}
                                                variant="rounded"
                                                src={book.imagePath ? `http://localhost:4008/images/books/${book.imagePath}` : ''}
                                            >
                                                {/* Only show the icon if there's no image */}
                                                {!book.imagePath && <Book sx={{ height: 90, width: 90 }} />}
                                            </Avatar>
                                            <Stack gap={3} justifyContent={'center'}>
                                                <Typography color={libTheme}>{book.name}</Typography>
                                            </Stack>
                                        </Grid>
                                    )
                                }

                            }
                        })}
                    </Grid>
                </div>
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[6, 12, 24]}
                                colSpan={100}
                                count={filteredBooks.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{ justifyContent: 'center' }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Stack>
            {<FilterModal open={openFilter} handleClose={() => setOpenFilter(false)} exampleData={books[0]!} setFilterChips={setFilterChips} />}
            {<CreateBookModel open={openAdd} handleClose={() => setOpenAdd(false)} />}
            {<ExportModal open={openExport} handleClose={() => setOpenExport(false)} data={filteredBooks} />}
            {<ImportModal open={openImport} handleClose={() => setOpenImport(false)} data={books[0]} />}
            {selectedBook && <UpdateModal open={openUpdate} handleClose={() => setOpenUpdate(false)} data={selectedBook} />}
            {selectedBook && <DeleteModal open={openDelete} handleClose={() => setOpenDelete(false)} data={selectedBook} />}
        </Container>
    )
}

