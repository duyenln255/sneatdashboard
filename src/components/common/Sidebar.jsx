import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../styles/theme';
import { useTranslation } from 'react-i18next';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{t(title)}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 15px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
        '& .pro-menu-item': {
          color: colors.grey[100],
        },
        '& .pro-menu-item:hover': {
          color: '#868dfb !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 30px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Box component="span" sx={{ display: 'flex', alignItems: 'center', color: '#666be9' }}>
                  <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt="sneat logo" style={{ height: '30px', marginRight: '8px' }} />
                  <Typography variant="h3" color={colors.grey[100]}>
                    sneat
                  </Typography>
                </Box>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : '5%'}>
            <Item
              title={t('dashboard')}
              to="/"
              icon={<OtherHousesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t('contact_form')}
              to="/form"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t('profile')}
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t('products')}
              to="/products"
              icon={<SpaOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: '15px 0 5px 20px' }}
            >
              {t('apps_pages')}
            </Typography>
            <SubMenu
              title={t('ecommerce')}
              icon={<ShoppingCartOutlinedIcon />}
            >
              {/* <Item
                title="Shop"
                to="/ecommerce/shop"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Products"
                to="/ecommerce/products"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
            <SubMenu
              title={t('academy')}
              icon={<AutoStoriesOutlinedIcon />}
            >
              {/* <Item
                title="Courses"
                to="/academy/courses"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Students"
                to="/academy/students"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
            <SubMenu
              title={t('logistics')}
              icon={<DirectionsCarFilledOutlinedIcon />}
            >
            </SubMenu>
            <SubMenu
              title={t('users')}
              icon={<PersonOutlinedIcon />}
            >
              {/* <Item
                title="List"
                to="/users/list"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="View"
                to="/users/view"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
            <SubMenu
              title={t('email')}
              icon={<EmailOutlinedIcon />}
            >
              {/* <Item
                title="Inbox"
                to="/email/inbox"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Compose"
                to="/email/compose"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
            <SubMenu
              title={t('chat')}
              icon={<ChatBubbleOutlineOutlinedIcon />}
            >
              {/* <Item
                title="Conversations"
                to="/chat/conversations"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Messages"
                to="/chat/messages"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
            <SubMenu
              title={t('calendar')}
              icon={<CalendarMonthOutlinedIcon />}
            >
              {/* <Item
                title="Events"
                to="/calendar/events"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Reminders"
                to="/calendar/reminders"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
            <SubMenu
              title={t('kanban')}
              icon={<ViewKanbanOutlinedIcon />}
            >
              {/* <Item
                title="Boards"
                to="/kanban/boards"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Tasks"
                to="/kanban/tasks"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
            <SubMenu
              title={t('invoice')}
              icon={<DescriptionOutlinedIcon />}
            >
              {/* <Item
                title="List"
                to="/invoice/list"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Create"
                to="/invoice/create"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
            <SubMenu
              title={t('roles_permissions')}
              icon={<GppGoodOutlinedIcon />}
            >
              {/* <Item
                title="Roles"
                to="/roles/roles"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Permissions"
                to="/roles/permissions"
                selected={selected}
                setSelected={setSelected}
              /> */}
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
