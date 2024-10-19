import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work'; // Job icon
import { Link } from 'react-router-dom';

// Create a custom theme for the AppBar
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(255, 165, 0, 0.7)', // Orange with 70% transparency (if needed later)
    },
    text: {
      primary: '#FFFFFF', // White for the icon and heading
    },
  },
});

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent' }}> 
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Side: Job Hub Heading */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <WorkIcon sx={{ backgroundClip: "icon",color:"darkblue" }} /> {/* White Job Hub icon */}
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginLeft: 1, color: "transparent",backgroundClip: "text",backgroundImage: "linear-gradient(to right,red,blue, black)"
}}>
              JobHub {/* White Job Hub heading */}
            </Typography>
          </div>

          {/* Right Side: Navigation Buttons */}
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', marginRight: 2, '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.7)' } }}>
                Home
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', marginRight: 2, '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.7)' } }}>
                Signup
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.7)' } }}>
                Login
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
