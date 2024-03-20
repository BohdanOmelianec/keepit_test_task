import React, { MouseEvent, useState } from 'react';
import {
  Box,
  Card,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SxProps,
  Typography,
} from '@mui/material';

import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Entity, EntityType } from '../../appTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCollection } from '../../context/CollectionContext';

const gridLayout: SxProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gridAutoRows: '170px',
  gap: 2,
  px: 2,
  mb: 2,
  overflowY: 'auto',
  overflowX: 'visible',
};

interface IProps {
  handleOpen: (type: EntityType) => void;
  onlyFolders: boolean;
  currentDate: string;
}

function FilesGrid({
  handleOpen,
  onlyFolders,
  currentDate,
}: IProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { files, currentEntity, setCurrentEntity, deleteEntity } = useCollection();

  const handleOpenMenu = (event: MouseEvent<HTMLElement>, entity: Entity) => {
    setCurrentEntity(entity);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={gridLayout}>
      {files
        .filter(
          (file) =>
            (onlyFolders ? file.type === 'folder' : true) &&
            (currentDate ? new Date(currentDate).getTime() < file.created : true)
        )
        .map((entity) => {
          if (onlyFolders && entity.type === 'file') return null;

          const to = `${location.pathname}/${entity.name.replaceAll(' ', '-')}`;
          return (
            <Card
              key={to}
              onClick={(e) => {
                if (e.detail === 2 && entity.type === 'folder') {
                  navigate(to);
                }
              }}
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateRows: '120px 50px',
                justifyItems: 'center',
                borderRadius: '10px',
                transition: 'background .3s ease',
                '&:hover': {
                  background: '#ddf1ff',
                },
              }}
            >
              <IconButton
                aria-label="settings"
                sx={{ position: 'absolute', right: 0 }}
                onClick={(e) => handleOpenMenu(e, entity)}
              >
                <MoreVertIcon />
              </IconButton>

              {entity.type === 'folder' ? (
                <FolderIcon sx={{ width: '100%', height: '100%' }} color="info" />
              ) : (
                <DescriptionIcon sx={{ width: '100%', height: '100%' }} color="info" />
              )}
              <Typography
                textAlign="center"
                className="line_clamp"
                sx={{
                  width: '150px',
                  px: 1,
                }}
              >
                {entity.name}
              </Typography>
            </Card>
          );
        })}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleOpen(currentEntity!.type);
            handleCloseMenu();
          }}
        >
          <ListItemIcon color="primary">
            <DriveFileRenameOutlineIcon color="primary" />
          </ListItemIcon>
          <Typography textAlign="center">Rename</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteEntity(currentEntity!.name);
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <Typography textAlign="center">Delete item</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default FilesGrid;
