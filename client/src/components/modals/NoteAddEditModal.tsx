import { Dialog, DialogTitle } from '@mui/material'



interface NoteModalInterface {
  open:boolean;
  handleClose:() => void;
}
export default function NoteAddEditModal({open,handleClose}:NoteModalInterface) {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Note</DialogTitle>
    </Dialog>
  )
}
