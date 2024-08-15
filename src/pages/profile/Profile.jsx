import React from 'react';
import { tokens } from "../../styles/theme";
import { Box, Typography, useTheme, Paper, Avatar, Grid } from "@mui/material";
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const email = user.email;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!user) {
    return <Typography variant="h6">No user information available</Typography>;
  }

  return (
    <Box m="20px">
      <Typography variant="h3" fontWeight="bold" mb="20px">
        Profile
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === 'dark' ? '#2c2c40' : undefined }}>
        <Typography variant="h5" fontWeight="bold" mb="10px" color={colors.blueAccent[500]}>
          Basic Info
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Typography variant="h6" color={colors.greenAccent[600]}>Profile Picture</Typography>
          </Grid>
          <Grid item xs={12} md={3} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              alt="Profile Picture"
              src={user.avatarUrl || "https://haycafe.vn/wp-content/uploads/2022/02/Anh-Avatar-Doremon-dep-ngau-cute.jpg"}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color={colors.greenAccent[600]}>Name</Typography>
            <Typography variant="body1">{user.name || ''}</Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === 'dark' ? '#2c2c40' : undefined }}>
        <Typography variant="h5" fontWeight="bold" mb="10px" color={colors.blueAccent[500]}>
          Contact Info
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color={colors.greenAccent[600]}>Email</Typography>
            <Typography variant="body1">{email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color={colors.greenAccent[600]}>Phone</Typography>
            <Typography variant="body1">{user.phone || ''}</Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="h6" color={colors.greenAccent[600]}>Password</Typography>

            <Typography variant="body1">{password}</Typography>
          </Grid> */}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
