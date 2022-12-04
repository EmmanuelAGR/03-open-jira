import { useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';
import { IEntry } from '../../interfaces';
import { INITIAL_STATE, postEntry, putEntry } from '../../services';

interface Props {
  children: React.ReactNode;
}

export interface EntriesState {
  entries: IEntry[];
}

export const EntriesProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE);

  const addEntry = (description: string) => postEntry(description, dispatch);

  const updateEntry = (entry: IEntry) => putEntry(entry, dispatch);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
