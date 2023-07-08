import { Box, CssBaseline, ThemeProvider, Toolbar, createTheme } from "@mui/material";

import React from "react";

import Statistics from "./pages/Statistics";
import Navbar from "./layout/Navbar";
import SideNav from "./layout/SideNav";


const defaultTheme = createTheme();

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Statistics />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App
