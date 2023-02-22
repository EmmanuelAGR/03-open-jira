import { useEffect, useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';
import { IEntry } from '../../interfaces';
import { INITIAL_STATE, postEntry, putEntry, deleteEntry, refreshEntries } from '../../services';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactNode;
}

export interface EntriesState {
  entries: IEntry[];
}

export const EntriesProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const addEntry = (description: string) => postEntry(description, dispatch);

  const updateEntry = (entry: IEntry, showSnackbar: boolean = false) =>
    putEntry(entry, dispatch, showSnackbar, enqueueSnackbar, router.back);

  const removeEntry = (entryId: string, showSnackbar: boolean = false) =>
    deleteEntry(entryId, dispatch, showSnackbar, enqueueSnackbar, router.back);

  useEffect(() => {
    refreshEntries(dispatch);
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addEntry,
        updateEntry,
        removeEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
