import React, { useState } from 'react';
import { Box, Paper, SxProps } from '@mui/material';
import { EntityType } from '../../appTypes';
import FilesGrid from './FilesGrid';
import RenameModal from '../Modal';
import Navigation from './Navigation';
import Actions from './Actions';
import { useCollection } from '../../context/CollectionContext';

const containerStyles: SxProps = {
  height: '100%',
  borderRadius: '20px',
  pb: 2,
  overflow: 'hidden',
  position: 'relative',
};

const paperStyles: SxProps = {
  display: 'grid',
  gridTemplateRows: 'auto auto 1fr',
  gap: 1,
  height: '100%',
  borderRadius: '20px',
  zIndex: 2,
};


function Main() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [onlyFolders, setOnlyFolders] = useState(false);
  const [type, setType] = useState<EntityType>('folder');
  const [currentDate, setCurrentDate] = useState('');

  const { setCurrentEntity } =
    useCollection();

  const handleModalOpen = (type: EntityType) => {
    setType(type);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentEntity(null);
  };

  return (
    <Box sx={containerStyles}>
      <Paper sx={paperStyles}>
        <Navigation />

        <Actions
          handleOpen={handleModalOpen}
          onlyFolders={onlyFolders}
          setOnlyFolders={setOnlyFolders}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />

        <FilesGrid
          handleOpen={handleModalOpen}
          onlyFolders={onlyFolders}
          currentDate={currentDate}
        />
      </Paper>
      <RenameModal open={isModalOpen} type={type} handleClose={handleModalClose} />
    </Box>
  );
}

export default Main;
