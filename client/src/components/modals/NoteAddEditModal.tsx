import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from '@mui/material'



interface NoteModalInterface {
  open:boolean;
  handleClose:() => void;
}
export default function NoteAddEditModal({open,handleClose}:NoteModalInterface) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth >
        <DialogTitle>Add Note</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText>
              Add or Update Notes from here. Enter Note Content in Markdown format
          </DialogContentText>
          <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="Title"
              label="Note Title"
              type="text"
              fullWidth
              variant="standard"
            />
        </DialogContent>
        <DialogContent>
          <TextField
              autoFocus
              required
              multiline
              rows={12}
              id="content"
              name="Content"
              label="Note Content"
              type="text"
              fullWidth
              variant="outlined"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Add</Button>
        </DialogActions>
    </Dialog>
  )
}
