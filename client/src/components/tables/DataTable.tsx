import {  IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExportIcon from '@mui/icons-material/GetApp';
import ImportIcon from '@mui/icons-material/FileUpload';
import DeleteModal from '../modals/DeleteModal';
import UpdateModal from '../modals/UpdateModal';
import { IBook, ICategory } from '../../interfaces/DataInterfaces';
import { isIBook, isICategory, renderBookRow, renderCategoryRow } from './DataRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLibraryDataContext } from '../../hooks/contextHooks/useLibraryDataContext';
import FilterModal from '../modals/FilterModal';


interface TableInterfaces<T> {
    headers: string[];
    tableDatas: T; // A generic should be used 
}


export default function DataTable({ headers, tableDatas }: TableInterfaces<IBook[]|ICategory[]>) {
    //Hooks
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);

    //Modal openings
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
    const [openFilter,setOpenFilter] = React.useState<boolean>(false);
    // selected Id and item for deletion and update
    const [selectedDeleteItem, setSelectedDeleteItem] = React.useState<IBook | ICategory>();
    const [selectedItem, setSelectedItem] = React.useState<IBook | ICategory>();

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

    const handleOpenUpdate = (item: any) => {
        setOpenUpdate(true);
        setSelectedItem(item);
    };
    

    const handleOpenDelete = (item: any) => {
        setOpenDelete(true);
        setSelectedDeleteItem(item);
    }

    const checkWhichRowsToShow = (page: number, rowsPerPage: number, index: number) => {
        let multiplied: number = page * rowsPerPage;
        let check1: boolean = index >= page * rowsPerPage;

        let check2: boolean = index < multiplied + rowsPerPage;

        return check1 && check2;
    }

    //Render Method to return different table rosw
    function renderTableCell<T>(value: T) {
        if (value && isIBook(value)) {
            return (
                <Fragment>
                {renderBookRow(value,() => handleOpenUpdate(value),() => handleOpenDelete(value))}
                </Fragment>
            );
        }
        else if(value && isICategory(value)){
            return (
                <Fragment>
                {renderCategoryRow(value,() => handleOpenUpdate(value),() => handleOpenDelete(value))}
                </Fragment>
            );
        }
    }

    useEffect(() => {
        if (selectedItem) {
            setOpenUpdate(true);
        }
    }, [selectedItem]);

    useEffect(() => {
        if (selectedDeleteItem) {
            setOpenDelete(true);
        }
    }, [selectedDeleteItem]);

    /*
    const filtered = useMemo(() => {
        if(tableDatas === books){
            return books.filter((book:IBook) => {
                return book.author === "Jack London"
            });
        }
        else{
            return tableDatas;
        }
    },[]);*/

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell align='center'>
                                <Tooltip title="Filter Items" arrow placement="top-start" onClick={() => setOpenFilter(true)}>
                                    <IconButton aria-label="filter">
                                        <FilterListIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell align='center'>
                                <Tooltip title="Export Items to Excel" arrow placement="top-start">
                                    <IconButton aria-label="export" color='success'>
                                        <ExportIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell align='center'>
                                <Tooltip title="Import Excel File to Table" arrow placement="top-start">
                                    <IconButton aria-label="filter" color='default'>
                                        <ImportIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell align='center'>
                                <Tooltip title="Delete Multiple" arrow placement="top-start">
                                    <IconButton aria-label="delete" color='error'>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ minHeight: 100, maxHeight: 450, overflowY: 'auto' }}>
                <Table stickyHeader >
                    <TableHead>
                        <TableRow>
                            {headers.map((header: string) => {
                                return (
                                    <TableCell key={header} align='center'> {header} </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {tableDatas && tableDatas.map((item: any, index: number) => {
                            if (checkWhichRowsToShow(page, rowsPerPage, index)) {
                                return (
                                    <TableRow key={index} hover >
                                        {renderTableCell(item)}
                                    </TableRow>
                                )
                            }
                            else {
                                return (
                                    <TableRow key={index}></TableRow>
                                )
                            }
                        })}
                        
                    </TableBody>
                </Table>

            </TableContainer>
            <TableContainer component={Paper}>
                <Table>
                    <TableFooter >
                        <TableRow>
                            <TablePagination
                                align='center'
                                rowsPerPageOptions={[1, 5, 10]}
                                colSpan={1}
                                count={tableDatas.length}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                page={page} />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {<UpdateModal open={openUpdate} handleClose={() => setOpenUpdate(false)}  data={selectedItem!} />}
            {<DeleteModal open={openDelete} handleClose={() => setOpenDelete(false)} data = {selectedDeleteItem!} />}
            {<FilterModal open={openFilter} handleClose={() => setOpenFilter(false)} exampleData = {tableDatas[0]!} />}

        </Fragment>
    )
}
