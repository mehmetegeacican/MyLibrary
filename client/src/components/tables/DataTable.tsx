import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';

import React, { Fragment, useEffect } from 'react';
import StatusChip from '../chip/StatusChip';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import ExportIcon from '@mui/icons-material/GetApp';
import ImportIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import DeleteModal from '../modals/DeleteModal';
import { useDeleteModal } from '../../hooks/modalHooks/useDeleteModal';
import UpdateModal from '../modals/UpdateModal';
import { IBook } from '../../interfaces/DataInterfaces';

interface TableInterfaces {
    headers: string[];
    tableDatas: IBook[]; // A generic should be used 
}

export default function DataTable({ headers, tableDatas }: TableInterfaces) {
    //Hooks
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);
    //Modal openings
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
    // selected Id and item for deletion and update
    const [selectedId, setSelectedId] = React.useState<number>(0);
    const [selectedItem, setSelectedItem] = React.useState<any>(null);

    const { deleteBook } = useDeleteModal();
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

    const handleOpenDelete = (id: number) => {
        setOpenDelete(true);
        setSelectedId(id);
    }

    const checkWhichRowsToShow = (page: number, rowsPerPage: number, index: number) => {
        let multiplied: number = page * rowsPerPage;
        let check1: boolean = index >= page * rowsPerPage;

        let check2: boolean = index < multiplied + rowsPerPage;

        return check1 && check2;
    }

    useEffect(() => {
        if (selectedItem) {
            setOpenUpdate(true);
        }
    }, [selectedItem]);

    useEffect(() => {
        if(selectedId && selectedId !== 0){
            setOpenDelete(true);
        }
    },[selectedId])

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell align='center'>
                                <Tooltip title="Filter Items" arrow placement="top-start">
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
            <TableContainer component={Paper} sx={{ height: 200, overflowY: 'auto' }}>
                <Table stickyHeader>
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
                        {tableDatas.map((item: any, index: number) => {
                            if (checkWhichRowsToShow(page, rowsPerPage, index)) {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center'> {item.id}</TableCell>
                                        <TableCell align='center'> {item.name}</TableCell>
                                        <TableCell align='center'> {item.author}</TableCell>
                                        <TableCell align='center'> <Button color='primary'> View </Button> </TableCell>
                                        <TableCell align='center'><StatusChip statusLabel={item.status} /> </TableCell>
                                        <TableCell align='center'> {dayjs(item.entered).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell align='center'> <Button color='primary'> View </Button></TableCell>
                                        <TableCell align='center'>
                                            <IconButton aria-label="edit" color='info' onClick={() => handleOpenUpdate(item)}>
                                                <EditIcon />
                                            </IconButton>

                                        </TableCell>
                                        <TableCell align='center'>
                                            <IconButton aria-label="delete" color='error' onClick={() => handleOpenDelete(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>

                                        </TableCell>

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
                                rowsPerPageOptions={[1, 2, 3, 6]}
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
            {<UpdateModal open={openUpdate} handleClose={() => setOpenUpdate(false)} dataFormat={'book'} data = {selectedItem}/>}
            {<DeleteModal open={openDelete} handleClose={() => setOpenDelete(false)} deleteData={async () => await deleteBook(selectedId)}/>}
           
        </Fragment>
    )
}
