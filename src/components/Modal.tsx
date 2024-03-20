import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  OutlinedInput,
  Modal,
  Button,
  FormHelperText,
} from '@mui/material';
import { EntityType } from '../appTypes';
import { useCollection } from '../context/CollectionContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 16,
};

interface IProps {
  open: boolean;
  type: EntityType;
  handleClose: () => void;
}

const fileNameRegExp = /([\d\w])+\.\w+/;

export default function RenameModal({
  open,
  type,
  handleClose,
}: IProps) {
  const { currentEntity, createEntity, renameEntity } = useCollection();
  const [name, setName] = useState(currentEntity ? currentEntity.name : '');

  useEffect(() => {
    setName(currentEntity?.name || '');
  }, [currentEntity]);

  const isDisabled =
    type === 'folder' ? !name || !(name.length <= 20) : !fileNameRegExp.test(name);

  const closeModal = () => {
    handleClose();
    setName('');
  };

  const handleSubmit = () => {
    handleClose();
    if(currentEntity) {
      renameEntity(type, name);
    } else {
      createEntity(type, name);
    }
    setName('');
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <CardHeader title={type === 'folder' ? 'New folder' : 'New file'} />
        <CardContent>
          <>
            <OutlinedInput
              required
              placeholder={type === 'folder' ? 'Folder name' : 'File.txt'}
              fullWidth
              sx={{ borderRadius: '50px' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {type === 'file' ? (
              <FormHelperText sx={{ ml: '10px' }}>
                Filename should be as: name.ext
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ ml: '10px' }}>Maximum 20 characters</FormHelperText>
            )}
          </>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="error" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="primary" disabled={isDisabled} onClick={handleSubmit}>
            OK
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
