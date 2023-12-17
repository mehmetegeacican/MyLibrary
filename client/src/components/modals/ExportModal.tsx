import { IBook, ICategory, IAuthor } from '../../interfaces/DataInterfaces';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import { isIAuthor, isIBook, isICategory } from '../tables/DataRow';


interface ExportModalInterface {
    open: boolean;
    handleClose: () => void;
    data: IBook[] | ICategory[] | IAuthor[];
}

export default function ExportModal({open, handleClose, data}: ExportModalInterface) {
    //Hooks
    const fileName = useMemo(() => {
        if(data && isIBook(data[0])){
            return "exported-books.csv";
        }
        else if(data && isICategory(data[0])){
            return "exported-categories.csv";
        }
        else if(data && isIAuthor(data[0])){
            return "exported-authors.csv";
        }
        return "my-file.csv";
    },[data]);

    // For Excluding The User ID
    const excludedFileData = useMemo(() => {
        if(data && isIBook(data[0])){
            let newData = data.map((item:any) => {
                const {user_id,...newObj} = item;
                return newObj;
            })
            return newData;
        }
        else if(data && isICategory(data[0])){
            let newData = data.map((item:any) => {
                const {user_id,...newObj} = item;
                return newObj;
            })
            return newData;
        }
        else if(data && isIAuthor(data[0])){
            let newData = data.map((item:any) => {
                const {user_id,...newObj} = item;
                return newObj;
            })
            return newData;
        }
        return data;
    },[data]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Warning!
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The following contents with the current filters will be exported, do you want to proceed?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button>
                <CSVLink className="downloadbtn" filename={fileName} data={excludedFileData}>
                    Export
                </CSVLink>
                </Button>
                
            </DialogActions>
        </Dialog>
    )
}
