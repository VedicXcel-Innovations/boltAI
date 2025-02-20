import React, { useState } from 'react';
import { Modal, TextField, Box, List, ListItemButton, ListItemText } from '@mui/material';

const SelectionPopup = ({ open, onClose, data, onSelect, title }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = item => {
    onSelect(item);
    onClose();
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxHeight: '70vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
        }}
      >
        <TextField
          label={`Search ${title}`}
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <List sx={{ pt: 2 }}>
          {filteredData.map(item => (
            <ListItemButton key={item.id} onClick={() => handleSelect(item)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default SelectionPopup;
