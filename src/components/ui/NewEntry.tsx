import { ChangeEvent, useState, useContext } from 'react';

import { Box, Button, TextField } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {
  const { addEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const clearForm = () => {
    if (inputValue.length > 0) setInputValue('');

    setIsAddingEntry();
    setTouched(false);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addEntry(inputValue);
    clearForm();
  };

  const onCancel = () => {
    clearForm();
  };

  return (
    <Box sx={{ marginBottom: 1, paddingX: 2 }}>
      {isAddingEntry ? (
        <div className='animate__animated animate__fadeIn'>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            multiline
            label='Nueva entrada'
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setTouched(true)}
          />

          <Box display='flex' justifyContent='space-between'>
            <Button variant='text' onClick={onCancel}>
              Cancelar
            </Button>

            <Button
              variant='outlined'
              color='secondary'
              startIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </div>
      ) : (
        <Button
          fullWidth
          variant='outlined'
          className='animate__animated animate__fadeIn'
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={setIsAddingEntry}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
