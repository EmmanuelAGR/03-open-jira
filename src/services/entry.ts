import { Dispatch } from 'react';

import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';

import { entriesApi } from '../apis';
import { EntriesActionType, EntriesState } from '../context/entries';
import { IEntry } from '../interfaces';

export const INITIAL_STATE: EntriesState = {
  entries: [],
};

export const refreshEntries = async (dispatch: Dispatch<EntriesActionType>) => {
  const { data } = await entriesApi.get<IEntry[]>('/entries');
  dispatch({ type: '[Entry] - GET', payload: data });
};

export const postEntry = async (
  description: string,
  dispatch: Dispatch<EntriesActionType>
) => {
  try {
    const { data } = await entriesApi.post<IEntry>('/entries', { description });
    dispatch({ type: '[Entry] - POST', payload: data });
  } catch (error) {
    console.log({ error });
  }
};

export const putEntry = async (
  { _id, description, status }: IEntry,
  dispatch: Dispatch<EntriesActionType>,
  showSnackbar: boolean,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject
  ) => SnackbarKey,
  previousPage: VoidFunction
) => {
  try {
    const { data } = await entriesApi.put<IEntry>(`/entries/${_id}`, {
      description,
      status,
    });

    dispatch({ type: '[Entry] - PUT', payload: data });

    if (showSnackbar)
      enqueueSnackbar('Entrada actualizada.', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    previousPage();
  } catch (error) {
    console.log({ error });
  }
};

export const deleteEntry = async (
  entryId: string,
  dispatch: Dispatch<EntriesActionType>,
  showSnackbar: boolean,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject
  ) => SnackbarKey,
  previousPage: VoidFunction
) => {
  try {
    const { data } = await entriesApi.delete<IEntry>(`/entries/${entryId}`);

    dispatch({ type: '[Entry] - DELETE', payload: data });

    if (showSnackbar)
      enqueueSnackbar('Entrada eliminada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });

    previousPage();
  } catch (error) {
    console.log({ error });
  }
};
