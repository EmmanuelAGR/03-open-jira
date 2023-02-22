import React from 'react'
import { useState, ChangeEvent, useMemo, useContext } from 'react';

import { GetServerSideProps } from 'next';

import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, IconButton, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts/Layout';
import { EntryStatus, IEntry } from '../../interfaces';
import { EntriesContext } from '../../context/entries/EntriesContext';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: IEntry;
}

const EntryPage = ( { entry }: Props ) => {
  
  const { updateEntry, removeEntry } = useContext( EntriesContext );
  
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const date = new Date(entry.createdAt);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value );
  };

  const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    if ( !validStatus.find( element => element === status)) return;
    
    setStatus( event.target.value as EntryStatus );
  };

  const onSave = () => {
    if ( inputValue.trim().length === 0 || status.trim().length === 0 ) return;
    
    const updatedEntry: IEntry = {
      ...entry,
      description: inputValue,
      status
    }

    updateEntry( updatedEntry, true );
  }
  
  return (
    <Layout title='Edit Entry'>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada el ${ date.toDateString() }.`}
            />
            <CardContent>
              <TextField 
                sx={{ marginTop: 2, marginBottom: 1}}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={ inputValue }
                onChange={ onTextFieldChanged }
                onBlur={ () => setTouched( true ) }
                helperText={ isNotValid  && 'Ingrese un valor' }
                error={ isNotValid }
              />

              {/* RADIO */}
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={ status }
                  onChange={ onStatusChanged }
                >
                  {
                    validStatus.map( option => (
                      <FormControlLabel 
                        key={ option }
                        value={ option }
                        control={ <Radio /> }
                        label={ capitalize(option) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>

            </CardContent>

            <CardActions>
              <Button
                startIcon={ <SaveOutlinedIcon /> }
                variant="contained"
                fullWidth
                onClick={ onSave }
                disabled={ inputValue.length <= 0 }
              >
                Save
              </Button>
            </CardActions>

          </Card>
        </Grid>
        
      </Grid>

      <IconButton 
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}
        onClick={ () => removeEntry( entry._id, true ) }
      >
        <DeleteOutlinedIcon />
      </IconButton>
      
    </Layout>
  )
};

//  

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById( id );

  if ( !entry ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;