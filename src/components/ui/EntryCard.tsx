import { DragEvent, useContext } from 'react';

import { useRouter } from 'next/router';

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
  const { setIsDragging } = useContext(UIContext);
  const router = useRouter();

  const date = new Date(entry.createdAt);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', entry._id);

    setIsDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
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
