import React from 'react';
import { Container, SxProps } from '@mui/material';
import AppBar from './AppBar';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import CollectionProvider from '../context/CollectionContext';

const containerStyles: SxProps = {
  height: '100dvh',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '250px 1fr',
  gridTemplateRows: '64px 1fr',
  overflow: 'hidden',
};

function Root() {
  return (
    <Container sx={containerStyles} maxWidth="xl">
      <CollectionProvider>
        <AppBar />
        <SideBar />
        <Outlet />
      </CollectionProvider>
    </Container>
  );
}

export default Root;
