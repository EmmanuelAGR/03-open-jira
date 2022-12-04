
export type EntryStatus = 'pending' | 'in-progress' | 'finished';

export interface IEntry {
  _id:         string;
  description: string;
  status:      EntryStatus;
  createdAt:   number;
}
