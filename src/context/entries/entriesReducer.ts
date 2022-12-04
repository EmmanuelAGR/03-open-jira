import { EntriesState } from './';
import { IEntry } from '../../interfaces';

export type EntriesActionType =
  | { type: '[Entry] - POST'; payload: IEntry }
  | { type: '[Entry] - PUT'; payload: IEntry };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case '[Entry] - POST':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case '[Entry] - PUT':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            entry.description = action.payload.description;
            entry.status = action.payload.status;
          }

          return entry;
        }),
      };

    default:
      return state;
  }
};
