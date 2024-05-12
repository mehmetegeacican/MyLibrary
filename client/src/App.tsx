import { Box, CssBaseline, ThemeProvider, Toolbar, createTheme } from "@mui/material";

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookPage from "./pages/Books";
import Navbar from "./layout/Navbar";
import SideNav from "./layout/SideNav";
import Dashboard from "./pages/Dashboard";
import AuthorsPage from "./pages/Authors";
import CategoriesPage from "./pages/Categories";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthContext } from "./hooks/contextHooks/useAuthContext";
import NotesPage from "./pages/NotesPage";



const defaultTheme = createTheme();

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { user } = useAuthContext();

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex', maxWidth: "100vw" }}>
          <CssBaseline />
          <Navbar open={open} toggleDrawer={toggleDrawer} />
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
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to={'/login'} />} />
              <Route path="/books" element={user ? <BookPage /> : <Navigate to={'/login'} />} />
              <Route path="/authors" element={user ? <AuthorsPage /> : <Navigate to={'/login'} />} />
              <Route path="/categories" element={user ? <CategoriesPage /> : <Navigate to={'/login'} />} />
              <Route path="/notes" element={user ? <NotesPage /> : <Navigate to={'/login'} />} />
              <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
              <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={'/'} />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
