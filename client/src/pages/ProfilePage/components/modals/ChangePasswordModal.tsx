import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'
import ChangePasswordForm from '../forms/ChangePasswordForm';
import { useLibraryTheme } from '../../../../hooks/theme/useLibraryTheme';
import { useState } from 'react';


interface IChangePasswordModalProps {
    open: boolean;
    handleClose: () => void;
    handleSave: Function;
    password:string;
}

export default function ChangePasswordModal({
    open,
    handleClose,
    handleSave,
}: IChangePasswordModalProps) {
    const { libTheme } = useLibraryTheme();
    
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

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
                <Stack spacing={2}>
                    <DialogContentText id="alert-dialog-description">
                        The current password will be updated. In order to do this, please enter your old password and the newly desired password below
                    </DialogContentText>
                    <ChangePasswordForm
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        oldPassword={oldPassword}
                        setOldPassword={setOldPassword}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button color={libTheme} onClick={() => handleSave(oldPassword,newPassword)}>
                    Save
                </Button>
                <Button color={libTheme} onClick={handleClose}>Cancel</Button>

            </DialogActions>
        </Dialog>
    )
}
