import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';




export const SignedInItems = [
    (<Link to={'/profile'} key={0}><MenuItem key={0} sx={{ color: "black" }}>Profile</MenuItem></Link>),
    (<MenuItem key={2} onClick={() => console.log("Logout")}>Logout</MenuItem>)
]

export const NotSignedInItems = [
    (<Link to={'/login'} key={0}><MenuItem key={0} color='secondary'>Login</MenuItem></Link>),
    (<Link to={'signup'} key={1}><MenuItem key={1} color='secondary'>Sign Up</MenuItem></Link>),
]