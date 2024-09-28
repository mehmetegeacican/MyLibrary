import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from '@mui/material'
import { INote } from '../../interfaces/DataInterfaces';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext';
import { useCreateAndUpdateForm } from '../../hooks/formHooks/useCreateAndUpdateForm';
import { useLibraryDataContext } from '../../hooks/contextHooks/useLibraryDataContext';
import UploadButton from '../buttons/uploadButton';



interface NoteModalInterface {
  open:boolean;
  handleClose:() => void;
  note?:INote | null;
}
export default function NoteAddEditModal({open,handleClose,note}:NoteModalInterface) {

  // Hooks & Contexts
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const [message,setMessage] = useState("");

  const {createNote, updateNote} = useCreateAndUpdateForm(error,setError,message,setMessage,success,setSuccess);
  const {noteTrigger,dispatch} = useLibraryDataContext();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [uploadedPicture,setUploadedPicture] = useState("");

  // Handlers
  const handleSave = async () => {
    if(!note){
      await createNote(title,content);
    }
    else {
      await updateNote(note.id,title,content);
    }
    dispatch({
      type: 'TRIGGER_NOTES',
      payload: !noteTrigger
    })
    handleClose();
  }

  useEffect(() => {
    if(note && open){
      setTitle(note.title);
      setContent(note.content || "");
    }
    else {
      setTitle("");
      setContent("");
    }
  },[open])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth >
        <DialogTitle>{!note ? 'Add Note' : 'Edit Note'}</DialogTitle>
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
        <DialogContent>
        <UploadButton 
          title='Upload Note Picture' 
          imagePath={uploadedPicture} 
          setImagePath={setUploadedPicture}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={async () => handleSave()}>Add</Button>
        </DialogActions>
    </Dialog>
  )
}
