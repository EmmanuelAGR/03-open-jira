import { createContext } from 'react';

import { IEntry } from '../../interfaces';

interface Props {
  entries: IEntry[];

  //Methods
  addEntry: (description: string) => void;
  updateEntry: (entry: IEntry) => void;
}

export const EntriesContext = createContext({} as Props);
