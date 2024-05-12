import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from '@mui/material'
import { INote } from '../../interfaces/DataInterfaces';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext';



interface NoteModalInterface {
  open:boolean;
  handleClose:() => void;
  mode:string;
  note?:INote;
}
export default function NoteAddEditModal({open,handleClose,mode,note}:NoteModalInterface) {

  // Hooks & Contexts
  const {user} = useAuthContext();
  const [title,setTitle] = useState(note?.title ?? '');
  const [content,setContent] = useState(note?.content ?? '');

  // Handlers
  const handleSave = () => {
    if(mode === 'add'){
        console.log("Saved")
    }
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth >
        <DialogTitle>{mode === 'add' ? 'Add Note' : 'Edit Note'}</DialogTitle>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              label="Note Content"
              type="text"
              fullWidth
              variant="outlined"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Add</Button>
        </DialogActions>
    </Dialog>
  )
}
