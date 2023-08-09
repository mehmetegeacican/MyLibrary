import { MenuItem } from '@mui/material';


export const SignedInItems = [
    (<MenuItem key={0} onClick={() => console.log("Profile")}>Profile</MenuItem>),
    (<MenuItem key={1} onClick={() => console.log("My account")}>My account</MenuItem>),
    (<MenuItem key={2} onClick={() => console.log("Logout")}>Logout</MenuItem>)
]

export const NotSignedInItems = [
    (<MenuItem key={0} onClick={() => console.log("Login")}>Login</MenuItem>),
    (<MenuItem key={1} onClick={() => console.log("My account")}>Sign Up</MenuItem>),
]