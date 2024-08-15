// src/components/LanguageSelector.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import {  IconButton, Avatar, Popover, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../styles/theme';

const LanguageSelector = ({ buttonStyles }) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language) => {
    setAnchorEl(null);
    if (language) {
      i18n.changeLanguage(language);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick} sx={buttonStyles}>
        <Avatar
          src={`https://flagcdn.com/${i18n.language === 'vi' ? 'vn' : i18n.language === 'ja' ? 'jp' : 'us'}.svg`}
          sx={{ width: '100%', height: '100%' }}
        />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
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
            color: theme.palette.mode === 'dark' ? colors.grey[100] : colors.grey[400],
            width: '165px',
            padding: '5px',
            mt : 1,
          },
        }}
      >
        <List sx ={{ padding: 0 }}>
          <ListItem button onClick={() => handleClose('vi')}>
            <Avatar src="https://flagcdn.com/vn.svg" sx={{ width: 24, height: 24, marginRight: 2 }} />
            <ListItemText primary="Tiếng Việt" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleClose('en')}>
            <Avatar src="https://flagcdn.com/us.svg" sx={{ width: 24, height: 24, marginRight: 2 }} />
            <ListItemText primary="English" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleClose('ja')}>
            <Avatar src="https://flagcdn.com/jp.svg" sx={{ width: 24, height: 24, marginRight: 2 }} />
            <ListItemText primary="日本語" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default LanguageSelector;
