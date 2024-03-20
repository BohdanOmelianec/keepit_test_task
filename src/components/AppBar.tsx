import React from 'react';
import {
  Avatar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  SxProps,
} from '@mui/material';

const boxStyles: SxProps = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '250px 1fr auto',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'space-between',
  gridColumn: '1 / 3',
};

function AppBar() {
  return (
    <Box sx={boxStyles}>
      <ListItem sx={{ width: '250px' }}>
        <ListItemIcon>
          <img
            src="//ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png"
            alt="Logo"
            aria-hidden="true"
            role="presentation"
            style={{ width: '40px', height: '40px' }}
          />
        </ListItemIcon>
        <ListItemText>Диск</ListItemText>
      </ListItem>

      <OutlinedInput
        placeholder="Search"
        size="small"
        sx={{ maxWidth: '450px', width: '100%', borderRadius: '50px' }}
      />
      <Avatar sx={{ m: 1 }} />
    </Box>
  );
}

export default AppBar;
