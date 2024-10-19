import React, { useState } from 'react';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle'; // User icon
import WorkIcon from '@mui/icons-material/Work'; // Job icon
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Logout icon
import { Link } from 'react-router-dom';

// Create a custom theme with black and white color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black background for the sidebar
    },
    text: {
      primary: '#ffffff', // White text for the sidebar items
    },
  },
});

const Adminnavbar = () => {
  // State to control the drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Swipeable Drawer with drag functionality */}
      <SwipeableDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{'& .MuiDrawer-paper': {width: 240,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Transparent black background
            color: '#ffffff', // White text
          },
        }}>
        <div>
          {/* User Icon on top */}
          <IconButton sx={{ justifyContent: 'center', display: 'flex', marginTop: 2 }}>
            <AccountCircle sx={{ fontSize: 60, color: '#ffffff' }} /> {/* Medium-sized user icon */}
          </IconButton>
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 1 }}>
            Admin Panal
          </Typography>
          {/* Sidebar Navigation Buttons */}
          <List>
            <Link to="/admindashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            </Link>
            <Link to="/managejob" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Manage Jobs" />
              </ListItem>
            </Link>

            <Link to="/viewuserapplications" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="View User Application" />
              </ListItem>
            </Link>
          </List>

          {/* Logout Button */}
          <Link to="/">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1A1A1A', // Custom color for the button
              marginTop: 'auto', marginLeft: 2,marginRight: 2,marginBottom: 2, textcolor:'white',display: 'flex',justifyContent: 'center',alignItems: 'center',
            }}
            startIcon={<ExitToAppIcon />}
            onClick={() => {
              // Handle logout logic here
              console.log("User logged out");}}>
            Logout
          </Button>
          </Link>
        </div>
      </SwipeableDrawer>

      {/* Toggle Button to Open the Sidebar */}
      <IconButton onClick={toggleDrawer(true)} sx={{ color: '#ffffff' }}>
        <AccountCircle sx={{ fontSize: 40 }} />
      </IconButton>
    </ThemeProvider>
  );
};

export default Adminnavbar;
