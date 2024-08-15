import { Box, Button, IconButton,Switch, Typography, useTheme } from "@mui/material";
import { useState } from 'react';
import { tokens } from "../../styles/theme";
import React from 'react';
import Header from "../../components/common/Header";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  //
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome back!" />
      </Box>
    </Box>
  );
};

export default Dashboard;
