import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

import React from 'react';

interface TableInterfaces {
    headers: string[];
    tableDatas: any; // A generic should be used 
}

export default function DataTable({headers,tableDatas}:TableInterfaces) {
    //Hooks
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);
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


    const checkWhichRowsToShow = (page: number, rowsPerPage: number, index: number) => {
        let multiplied: number = page * rowsPerPage;
        let check1: boolean = index >= page * rowsPerPage;

        let check2: boolean = index < multiplied + rowsPerPage;

        return check1 && check2;
    }

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table sx={{ minWidth: 650 }} aria-label="data table" stickyHeader>
                <TableHead>
                    <TableRow >
                        <TableCell align='center'> Filter </TableCell>
                        <TableCell align='center'> Export </TableCell>
                        <TableCell align='center'> Import </TableCell>
                        <TableCell align='center'> </TableCell>
                    </TableRow>
                    <TableRow>
                        {headers.map((header: string) => {
                            return (
                                <TableCell key={header} align='center'> {header} </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableDatas.map((item: any, index: number) => {
                        if (checkWhichRowsToShow(page, rowsPerPage, index)) {
                            return (

                                <TableRow key={index}>
                                    <TableCell align='center'> {item.id}</TableCell>
                                    <TableCell align='center'> {item.name}</TableCell>
                                    <TableCell align='center'> {item.author}</TableCell>
                                    <TableCell align='center'> <Button color='primary'> {item.category}</Button> </TableCell>
                                    <TableCell align='center'> <Chip color='error' clickable label={item.Status}></Chip></TableCell>
                                    <TableCell align='center'> {item.entered}</TableCell>
                                    <TableCell align='center'> <Button color='primary'> {item.notes}</Button></TableCell>
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
    )
}
