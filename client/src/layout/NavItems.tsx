import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link to="/">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" color='secondary' />
      </ListItemButton>
    </Link>

    <Link to="/books">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <LocalLibraryIcon />
        </ListItemIcon>
        <ListItemText primary="Books" />
      </ListItemButton>
    </Link>

    <Link to="/authors">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Authors" />
      </ListItemButton>
    </Link>

    <Link to="/categories">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const mainListItemsSignedOut = (
  <React.Fragment>
    <ListItemButton sx={{ color: "black" }}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Introduction" color='secondary' />
    </ListItemButton>
    <Link to="/signup">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Up" color='secondary' />
      </ListItemButton>
    </Link>
    <Link to="/login">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Login" color='secondary' />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <Link to="/notes">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="My Notes" color='secondary' />
      </ListItemButton>
    </Link>
  </React.Fragment>
);