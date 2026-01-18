import { ThemeProvider, createTheme } from "@mui/material";

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookPage from "./pages/BooksPage";
import Dashboard from "./pages/Dashboard";
import AuthorsPage from "./pages/AuthorsPage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthContext } from "./hooks/contextHooks/useAuthContext";
import NotesPage from "./pages/NotesPage";
import SpecificNotePage from "./pages/SpecificNotePage";
import ProfilePage from "./pages/ProfilePage";
import Statistics from "./pages/Statistics";
import SubscriptionPage from "./pages/SubscriptionPage";
import MindMapDashboardPage from "./pages/MindMapDashBoardPage";
import MindMapWhiteBoardPage from "./pages/WhiteboardPage";
import { SUBSCRIPTION_METHOD } from "./enums/enums";
import MainLayout from "./layout/MainLayout/MainLayout";
import CircularProgress from '@mui/material/CircularProgress';
import { useLibraryTheme } from "./hooks/theme/useLibraryTheme";



const defaultTheme = createTheme();

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { user, plan, isInitialized } = useAuthContext();
  const {libTheme} = useLibraryTheme();

  if (!isInitialized) {
    return  <CircularProgress color={libTheme}/>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          {/* Routes that use the main layout */}
          <Route element={<MainLayout open={open} toggleDrawer={toggleDrawer} />}>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to={'/login'} />} />
            <Route path="/books" element={user ? <BookPage /> : <Navigate to={'/login'} />} />
            <Route path="/authors" element={user ? <AuthorsPage /> : <Navigate to={'/login'} />} />
            <Route path="/categories" element={user ? <CategoriesPage /> : <Navigate to={'/login'} />} />
            <Route path="/notes" element={user ? <NotesPage /> : <Navigate to={'/login'} />} />
            <Route path="/statistics" element={user && plan === SUBSCRIPTION_METHOD.PRO ? <Statistics /> : <Navigate to={'/subscriptions'} />} />
            <Route path="/mindmap" element={user && plan === SUBSCRIPTION_METHOD.PRO ? <MindMapDashboardPage /> : <Navigate to={'/subscriptions'} />} />
            <Route path="/subscriptions" element={user ? <SubscriptionPage /> : <Navigate to={'/login'} />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
            <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={'/'} />} />
            <Route path="/notes/:id" element={user ? <SpecificNotePage /> : <Navigate to={'/login'} />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to={'/login'} />} />
          </Route>
          {/* Routes that DO NOT use the main layout */}
          <Route path="/mindmap/:id" element={user && plan === SUBSCRIPTION_METHOD.PRO ? <MindMapWhiteBoardPage /> : <Navigate to={'/subscriptions'} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
