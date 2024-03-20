import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink, useLocation } from 'react-router-dom';
import { useCollection } from '../../context/CollectionContext';
import NestedList from './NestedList';

function SideBar() {
  const { collection } = useCollection();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ p: 1, overflowX: 'scroll', width: '100%' }}>
      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <NavLink
          to={pathname}
          style={{ color: 'inherit' }}
          className={({ isActive }) => (isActive ? 'activeLink' : '')}
        >
          <ListItemButton>
            {open ? (
              <ExpandLess onClick={handleOpen} />
            ) : (
              <ExpandMore onClick={handleOpen} />
            )}
            <ListItemIcon>
              <StorageIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="My files" />
          </ListItemButton>
        </NavLink>

        {collection.children.map((item, index) => {
          return <NestedList key={index} item={item} openList={open} m={8} path={'/my-files'} />;
        })}

        <NavLink
          to="trash"
          style={{ color: 'inherit' }}
          className={({ isActive }) => (isActive ? 'activeLink' : '')}
        >
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </NavLink>
      </List>
    </Box>
  );
}

export default SideBar;