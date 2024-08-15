import React, { useState, useContext } from 'react';
import { Box, IconButton, useTheme, InputBase, Popover, Avatar, List, ListItem, ListItemText, Divider, Typography, Button } from "@mui/material";
import { ColorModeContext, tokens } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next';

const notifications = [
  { id: 1, message: "New comment on your post", time: "5m" },
  { id: 2, message: "New follower", time: "20m" },
  { id: 3, message: "Update available", time: "1h" },
];

const Topbar = ({ setAuthenticated }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePersonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthenticated(false);
    navigate('/login');
  };

  const open = Boolean(anchorEl);
  const notifOpen = Boolean(notifAnchorEl);
  const id = open ? 'person-popover' : undefined;
  const notifId = notifOpen ? 'notifications-popover' : undefined;

  const buttonStyles = {
    width: 40,
    height: 40,
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      <Box
        display="flex"
        alignItems="center"
        backgroundColor={colors.primary[400]}
        borderRadius="8px"
        pl={2}
        pr={2}
        height="40px"
        width="90%"
      >
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
        <InputBase sx={{ flex: 1 }} placeholder={t('search_placeholder')} />
      </Box>

      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode} sx={buttonStyles}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <LanguageSelector buttonStyles={buttonStyles} />

        <IconButton onClick={handleNotificationsClick} sx={buttonStyles}>
          <NotificationsOutlinedIcon />
        </IconButton>
{/* 
        <Popover
          id={notifId}
          open={notifOpen}
          anchorEl={notifAnchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.mode === 'dark' ? '#2c2c40' : '#ffffff',
              color: colors.grey[100],
              width: '200px',
              padding: '10px',
              mt: 1,
            },
          }}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            {t('notifications')}
          </Typography>
          <Divider />
          <List dense>
            {notifications.map((notif) => (
              <ListItem key={notif.id}>
                <ListItemText
                  primary={t(notif.message)}
                  secondary={notif.time}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Button onClick={() => handleNavigate('/notifications')} fullWidth sx={{ color: theme.palette.mode === 'dark' ? 'white' : undefined }}>
            {t('see_more')}
          </Button>
        </Popover> */}

        <IconButton onClick={handlePersonClick} sx={buttonStyles}>
          <Avatar alt="Profile Picture" src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-Avatar-Doremon-dep-ngau-cute.jpg" />
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.mode === 'dark' ? '#2c2c40' : '#ffffff',
              color: colors.grey[100],
              width: '220px',
              padding: '10px',
              mt: 1,
            },
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              alt="Profile Picture"
              src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-Avatar-Doremon-dep-ngau-cute.jpg"
              sx={{ width: 60, height: 60, mb: 1 }}
            />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                mt: 1,
                borderColor: theme.palette.mode === 'dark' ? 'white' : undefined,
                color: theme.palette.mode === 'dark' ? 'white' : undefined,
                '&:hover': {
                  borderColor: theme.palette.mode === 'dark' ? 'white' : undefined,
                  backgroundColor: theme.palette.mode === 'dark' ? '#2c2c40' : '#ffffff',
                }
              }}
              onClick={() => handleNavigate('/profile')}
            >
              {t('view_profile')}
            </Button>
            <Divider sx={{ my: 1, width: '100%' }} />
            <List sx={{ padding: 0 }}>
              <ListItem button>
                <ListItemText primary={t('settings_privacy')} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={t('help')} />
              </ListItem>
            </List>
            <Divider sx={{ width: '100%' }} />
            <Button
              color="primary"
              fullWidth
              sx={{
                mt: 1,
                borderColor: theme.palette.mode === 'dark' ? 'white' : undefined,
                color: theme.palette.mode === 'dark' ? 'white' : undefined,
                '&:hover': {
                  borderColor: theme.palette.mode === 'dark' ? 'white' : undefined,
                  backgroundColor: theme.palette.mode === 'dark' ? '#2c2c40' : '#ffffff',
                }
              }}
              onClick={handleSignOut}
            >
              {t('sign_out')}
            </Button>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
