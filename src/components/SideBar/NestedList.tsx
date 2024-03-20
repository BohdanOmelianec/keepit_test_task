import React, { useState } from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { Entity } from '../../appTypes';

interface IProps {
  item: Entity;
  openList: boolean;
  m: number;
  path: string;
}

function NestedList({ item, openList, m, path }: IProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const newPath = `${path}/${item.name.replaceAll(' ', '-')}`;

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleClick = () => {
    if (item.type === 'folder') {
      navigate(newPath);
    }
  };

  return (
    <Collapse in={openList} timeout="auto" unmountOnExit>
      <List
        component="div"
        disablePadding
        sx={{ ml: `${m}px`, width: '100%', borderLeft: '1px solid #c1c1c1' }}
      >
        <ListItemButton
          sx={{ width: '100%', position: 'relative' }}
          onClick={handleClick}
        >
          {item.type === 'folder' &&
            item.children.length !== 0 &&
            (open ? (
              <ExpandLess onClick={handleOpen} />
            ) : (
              <ExpandMore onClick={handleOpen} />
            ))}
          <ListItemIcon sx={{ minWidth: '36px' }}>
            {item.type === 'folder' ? <FolderIcon /> : <DriveFileRenameOutlineIcon />}
          </ListItemIcon>
          <Typography sx={{ fontSize: '14px' }}>{item.name}</Typography>
        </ListItemButton>

        {item.type === 'folder' &&
          item.children.map((item, index) => {
            return (
              <NestedList key={index} item={item} openList={open} m={m} path={newPath} />
            );
          })}
      </List>
    </Collapse>
  );
}

export default NestedList;