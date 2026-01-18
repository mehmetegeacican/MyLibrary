import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import {
  Assignment,
  Dashboard,
  LoyaltyOutlined, 
  AnalyticsSharp,
  LocalLibrary,
  Category,
  People,
  Person,
  Map
} from '@mui/icons-material';


export const mainListItems = (
  <React.Fragment>
    <Link to="/">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" color='secondary' />
      </ListItemButton>
    </Link>

    <Link to="/books">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <LocalLibrary />
        </ListItemIcon>
        <ListItemText primary="Books" />
      </ListItemButton>
    </Link>

    <Link to="/authors">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <People/>
        </ListItemIcon>
        <ListItemText primary="Authors" />
      </ListItemButton>
    </Link>

    <Link to="/categories">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <Category/>
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
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Introduction" color='secondary' />
    </ListItemButton>
    <Link to="/signup">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Sign Up" color='secondary' />
      </ListItemButton>
    </Link>
    <Link to="/login">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <Dashboard />
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
          <Assignment/>
        </ListItemIcon>
        <ListItemText primary="My Essays" color='secondary' />
      </ListItemButton>
    </Link>
    <Link to="/profile">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Profile" color='secondary' />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const proListItems = (
  <React.Fragment>
    <Link to="/statistics">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <AnalyticsSharp/>
        </ListItemIcon>
        <ListItemText primary="Stats" />
        <LoyaltyOutlined sx={{ height: 23, marginRight: 1, color: 'silver' }} />
      </ListItemButton>
    </Link>
    <Link to="/mindmap">
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>
          <Map />
        </ListItemIcon>
        <ListItemText primary="Mind Map" />
        <LoyaltyOutlined sx={{ height: 23, marginRight: 1, color: 'silver' }} />
      </ListItemButton>
    </Link>
  </React.Fragment>
)