import React from 'react';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
// import { useCollection } from '../context/CollectionContext';
// import { Collection } from '../appTypes';

// const getAllFiles = (collection: Collection) => {
//   const newFiles = paths.slice(1).reduce((acc: ChildrenArray, curr: string) => {
//     const a = acc.find((item) => item.name === curr);
//     return (a as IFolder).children;
//   }, collection.children);
//   return newFiles;
// };

function SideBar() {
  // const { collection } = useCollection();
  return (
    <Box sx={{ p: 1 }}>
      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <NavLink to="my-files" style={{ color: 'inherit' }} className={({ isActive }) => (isActive ? 'activeLink' : '')}>
          <ListItemButton>
            <ListItemIcon>
              <StorageIcon color='success' />
            </ListItemIcon>
            <ListItemText primary="My files" />
          </ListItemButton>
        </NavLink>
        <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              {/* <StarBorder /> */}
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
        <NavLink to="trash" style={{ color: 'inherit' }} className={({ isActive }) => (isActive ? 'activeLink' : '')}>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon color='error' />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </NavLink>
      </List>
    </Box>
  );
}

export default SideBar;
