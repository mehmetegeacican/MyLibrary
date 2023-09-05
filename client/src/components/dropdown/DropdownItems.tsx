import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';


export const SignedInItems = [
    (<MenuItem key={0} onClick={() => console.log("Profile")}>Profile</MenuItem>),
    (<MenuItem key={1} onClick={() => console.log("My account")}>My account</MenuItem>),
    (<MenuItem key={2} onClick={() => console.log("Logout")}>Logout</MenuItem>)
]

export const NotSignedInItems = [
    (<Link to={'/login'}><MenuItem key={0} onClick={() => console.log("Login")}>Login</MenuItem></Link>),
    (<Link to={'signup'}><MenuItem key={1} onClick={() => console.log("My account")}>Sign Up</MenuItem></Link>),
]