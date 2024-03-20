import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { EntityType } from '../../appTypes';

interface IProps {
  handleOpen: (type: EntityType) => void;
  onlyFolders: boolean;
  setOnlyFolders: React.Dispatch<React.SetStateAction<boolean>>;
  currentDate: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
}

function Actions({
  handleOpen,
  onlyFolders,
  setOnlyFolders,
  currentDate,
  setCurrentDate,
}: IProps) {
  return (
    <Box sx={{ px: 2, pb: 2, display: 'flex', gap: 1 }}>
      <IconButton
        color="info"
        onClick={handleOpen.bind(null, 'folder')}
        title="New folder"
      >
        <CreateNewFolderIcon />
      </IconButton>
      <IconButton color="info" onClick={handleOpen.bind(null, 'file')} title="New file">
        <NoteAddIcon />
      </IconButton>
      <FormControlLabel
        control={
          <Checkbox
            value={onlyFolders}
            onChange={(e) => setOnlyFolders(e.target.checked)}
          />
        }
        label="Show only folders"
      />
      <OutlinedInput
        type="date"
        size="small"
        value={currentDate}
        onChange={(e) => setCurrentDate(e.target.value)}
      />
    </Box>
  );
}

export default Actions;
