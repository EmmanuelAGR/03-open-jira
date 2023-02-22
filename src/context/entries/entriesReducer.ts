import { EntriesState } from './';
import { IEntry } from '../../interfaces';

export type EntriesActionType =
  | { type: '[Entry] - GET'; payload: IEntry[] }
  | { type: '[Entry] - POST'; payload: IEntry }
  | { type: '[Entry] - PUT'; payload: IEntry }
  | { type: '[Entry] - DELETE'; payload: IEntry };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case '[Entry] - GET':
      return {
        ...state,
        entries: [...action.payload],
      };

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

    case '[Entry] - DELETE':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload._id),
      };

    default:
      return state;
  }
};
