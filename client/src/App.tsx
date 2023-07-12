import { Box, CssBaseline, ThemeProvider, Toolbar, createTheme } from "@mui/material";

import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Statistics from "./pages/Books";
import Navbar from "./layout/Navbar";
import SideNav from "./layout/SideNav";
import Dashboard from "./pages/Dashboard";



const defaultTheme = createTheme();

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex', maxWidth: "100vw" }}>
          <CssBaseline />
          <Navbar open={open} toggleDrawer={toggleDrawer} />
          <SideNav open={open} toggleDrawer={toggleDrawer} />
          <Box
            alignContent={"center"}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[200]
                  : theme.palette.grey[800],
              width: "100vw"
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/books" element={<Statistics />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
