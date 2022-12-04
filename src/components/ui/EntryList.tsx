import { useContext, useMemo, DragEvent } from 'react';

import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces/entry';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus
}

export const EntryList = ( { status }: Props ): JSX.Element => {
  const { entries, updateEntry } = useContext( EntriesContext );
  const { isDragging, setIsDragging } = useContext( UIContext );

  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ]);

  const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
  }
  
  const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
    const id = event.dataTransfer.getData('id');

    const entry = entries.find( e => e._id === id )!;
    entry.status = status;
    
    updateEntry( entry );
    setIsDragging();
  }
  
  return (
    // TODO: Aqui haremos drop
    <div onDrop={ onDropEntry } onDragOver={ allowDrop } className={ isDragging ? styles.dragging : '' }>
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          overflowY: 'scroll',
          backgroundColor: 'transparent',
          padding: '1px 5px'
        }}
        className='hideScroll'
      >
        {/* TODO: Cambiara dependiendo si esta haciendo drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
          {
            entriesByStatus.map( entry => (
              <EntryCard key={ entry._id } entry={ entry } />
            ))
          }
        </List>
      </Paper>
    </div>
  );
};
