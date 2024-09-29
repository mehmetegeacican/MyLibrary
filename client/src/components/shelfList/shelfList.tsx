import { SearchRounded } from '@mui/icons-material'
import { TextField, MenuItem, Button, Container, Stack, Grid, TablePagination, Avatar, Typography, darken } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExportIcon from '@mui/icons-material/GetApp';
import ImportIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useMemo, useEffect } from 'react'
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useLibraryDataContext } from '../../hooks/contextHooks/useLibraryDataContext';
import { IBook } from '../../interfaces/DataInterfaces';
import BookIcon from '@mui/icons-material/Book';
import FilterModal from '../modals/FilterModal';


const checkWhichRowsToShow = (page: number, rowsPerPage: number, index: number) => {
    let multiplied: number = page * rowsPerPage;
    let check1: boolean = index >= page * rowsPerPage;

    let check2: boolean = index < multiplied + rowsPerPage;

    return check1 && check2;
}

export default function Shelflist() {
    const { libTheme } = useLibraryTheme();
    const [query, setQuery] = useState("");
    const { books } = useLibraryDataContext();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [filterChips, setFilterChips] = useState<string[]>([]);

    //Handlers
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
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
        if (!filterChips.length) return books; // If no filters, return all books
      
        return books.filter((book) => {
          return filterChips.every((chip) => {
            const [filterType, filterValue] = chip.split('-');
      
            switch (filterType) {
              case 'Name':
                return book.name === filterValue;
              case 'Author':
                return book.authors.includes(filterValue);
              case 'Categories':
                return book.category.includes(filterValue);
              // Add more cases for other filters if needed
              default:
                return true; // If filter type doesn't match, include the book
            }
          });
        });
      }, [books, filterChips]); // Include books and filterChips in dependencies

    return (
        <Container>
            <Stack gap={5}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1
                }}>
                    <TextField
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
                    />
                    <Button color={'inherit'} variant='text' onClick={() => setOpenFilter(true)}><FilterListIcon /></Button>
                    <Button color={'success'} variant='text' onClick={() => console.log("aaa")}><ExportIcon /></Button>
                    <Button color={'secondary'} variant='text' onClick={() => console.log("aaa")}><ImportIcon /></Button>
                    <Button color={'inherit'} variant='text' onClick={() => console.log("aaa")}><PostAddIcon /></Button>
                    <Button color={'error'} variant='text' onClick={() => console.log("aaa")}><DeleteIcon /></Button>
                </div>
                <div>
                    <Grid container spacing={2} style={{
                        height: 280,
                        overflowY: 'auto',
                        scrollbarWidth: 'none'
                    }}>
                        {filteredBooks.map((book: IBook, index: number) => {
                            if (checkWhichRowsToShow(page, rowsPerPage, index)) {
                                return (
                                    <Grid item xs={6} md={4} lg={2}>
                                        <Avatar sx={{
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
                                            {!book.imagePath && <BookIcon sx={{ height: 90, width: 90 }} />}
                                        </Avatar>
                                        <Stack gap={3} justifyContent={'center'}>
                                            <Typography color={libTheme}>{book.name}</Typography>
                                        </Stack>
                                    </Grid>
                                )
                            }
                        })}
                    </Grid>
                </div>
                <div>
                    <TablePagination
                        align='center'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        rowsPerPageOptions={[6, 12, 24]}
                        colSpan={1}
                        count={filteredBooks.length}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page} />
                </div>

            </Stack>
            {<FilterModal open={openFilter} handleClose={() => setOpenFilter(false)} exampleData={books[0]!} setFilterChips={setFilterChips} />}

        </Container>
    )
}

function filterDataByFilterInputs(tableDatas: any, filterChips: any) {
    throw new Error('Function not implemented.');
}

