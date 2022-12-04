import { Dispatch } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { EntriesActionType, EntriesState } from '../context/entries';
import { IEntry } from '../interfaces';

export const INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        'Pending: Officia ipsum qui occaecat enim duis nulla veniam labore excepteur in magna eiusmod proident.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        'In-Progress: Ea cupidatat in nostrud proident duis consectetur velit est.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        'Finished: Anim labore culpa commodo dolor velit adipisicing deserunt proident consectetur aliquip ut laborum.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};

export const postEntry = (
  description: string,
  dispatch: Dispatch<EntriesActionType>
) => {
  const newEntry: IEntry = {
    _id: uuidv4(),
    description,
    status: 'pending',
    createdAt: Date.now(),
  };

  dispatch({ type: '[Entry] - POST', payload: newEntry });
};

export const putEntry = (
  entry: IEntry,
  dispatch: Dispatch<EntriesActionType>
) => dispatch({ type: '[Entry] - PUT', payload: entry });
