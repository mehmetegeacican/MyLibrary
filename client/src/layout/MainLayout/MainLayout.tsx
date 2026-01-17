import React from 'react';
import Navbar from '../Navbar'; "../Navbar"
import SideNav from '../SideNav';
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function MainLayout({ open, toggleDrawer }: { open: boolean; toggleDrawer: Function }) {
    return (
        <Box sx={{ display: 'flex', maxWidth: "100vw" }}>
            {<CssBaseline />}
            {<Navbar open={open} toggleDrawer={toggleDrawer} />}
            {<SideNav open={open} toggleDrawer={toggleDrawer} />}
            <Box
                alignContent={"flex-start"}
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                    width: "100vw"
                }}
            >
                <Toolbar />
                <Outlet /> 
            </Box>
        </Box>
    )
}
