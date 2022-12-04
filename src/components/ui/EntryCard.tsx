import { DragEvent, useContext } from 'react';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

import { IEntry } from '../../interfaces';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
  entry: IEntry;
}

export const EntryCard = ({ entry }: Props): JSX.Element => {
  const { setIsDragging } = useContext( UIContext )
  
  const date = new Date(entry.createdAt);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', entry._id);

    setIsDragging()
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}
        >
          <Typography variant='body2'>{date.toDateString()}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
