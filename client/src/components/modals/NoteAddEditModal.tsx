import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from '@mui/material'
import { INote } from '../../interfaces/DataInterfaces';
import { useEffect, useState } from 'react';
import { useCreateAndUpdateForm } from '../../hooks/formHooks/useCreateAndUpdateForm';
import { useLibraryDataContext } from '../../hooks/contextHooks/useLibraryDataContext';
import UploadButton from '../buttons/uploadButton';
import { postNewImage } from '../../apis/imageApis';
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext';
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';



interface NoteModalInterface {
  open:boolean;
  handleClose:() => void;
  note?:INote | null;
}
export default function NoteAddEditModal({open,handleClose,note}:NoteModalInterface) {

  // Hooks & Contexts
  const {user} = useAuthContext();
  const [success,setSuccess] = useState(false);
  const {libTheme} = useLibraryTheme();
  const [error,setError] = useState(false);
  const [message,setMessage] = useState("");

  const {createNote, updateNote} = useCreateAndUpdateForm(error,setError,message,setMessage,success,setSuccess);
  const {noteTrigger,dispatch} = useLibraryDataContext();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [imagePath,setImagePath] = useState("");
  const [imageFile,setImageFile] = useState(null);

  // Handlers
  const handleSave = async () => {
    if(imageFile){
      let formData = new FormData();
      formData.append('location','notes');
      formData.append('image',imageFile);
      await postNewImage(formData,user!.token)
    }
    if(!note){
      await createNote(title,content,imagePath);
    }
    else {
      await updateNote(note.id,title,content,imagePath);
    }
    dispatch({
      type: 'TRIGGER_NOTES',
      payload: !noteTrigger
    })
    handleClose();
    setImageFile(null);
    setImagePath("");
  }

  useEffect(() => {
    if(note && open){
      setTitle(note.title);
      setContent(note.content || "");
      setImagePath(note.imagePath || "");
    }
    else {
      setTitle("");
      setContent("");
    }
  },[open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth >
        <DialogTitle>{!note ? 'Add Note' : 'Edit Note'}</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText color={libTheme}>
              Add or Update Notes from here. Enter Note Content in Markdown format
          </DialogContentText>
          <TextField
              autoFocus
              required
              color={libTheme}
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
              color={libTheme}
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
          imagePath={imagePath}
          imageFile = {imageFile}
          setImagePath={setImagePath}
          setImageFile={setImageFile}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
              handleClose();
              setImageFile(null);
              setImagePath("");
            }} color={libTheme} >Cancel</Button>
          <Button onClick={async () => handleSave()} color={libTheme}>Add</Button>
        </DialogActions>
    </Dialog>
  )
}
