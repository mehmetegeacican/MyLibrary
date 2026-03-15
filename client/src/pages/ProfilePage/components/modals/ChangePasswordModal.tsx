import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'
import ChangePasswordForm from '../forms/ChangePasswordForm';
import { useLibraryTheme } from '../../../../hooks/theme/useLibraryTheme';


interface IChangePasswordModalProps {
    open: boolean;
    handleClose: () => void;
    oldPassword?: string;
}

export default function ChangePasswordModal({
    open,
    handleClose,
}: IChangePasswordModalProps) {
    const { libTheme } = useLibraryTheme();
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
                    <ChangePasswordForm />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button color={libTheme} onClick={async () => console.log("Password Change")}>
                    Save
                </Button>
                <Button color={libTheme} onClick={handleClose}>Cancel</Button>

            </DialogActions>
        </Dialog>
    )
}
