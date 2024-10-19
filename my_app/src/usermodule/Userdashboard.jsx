import React from "react";
import { Card, CardContent, Typography, Avatar, Grid, Box } from "@mui/material";
import Usernavbar from "./Usernavbar";

const Userdashboard = () => {
  return (
    <>
      <Usernavbar />
      <div style={{ marginLeft: 240, padding: 20 }}>
        <h1 style={{color:"white"}} >User Dashboard</h1>
        <Grid container justifyContent="center">
          {/* User Profile Card */}
          <Card sx={{ maxWidth: 400, padding: '20px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* User Picture */}
              <Avatar
                src="https://img.freepik.com/free-photo/male-executive-with-glasses_1098-760.jpg" // Replace with actual user image URL
                sx={{ width: 100, height: 100, marginBottom: 2 }}
                alt="User"
              />
              {/* User Details */}
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  John 
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: john@example.com
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Mobile: +123 456 7890
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Qualification: BSc in Computer Science
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: India, CA
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </div>
    </>
  );
};

export default Userdashboard;
