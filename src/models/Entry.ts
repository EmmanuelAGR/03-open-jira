import mongoose, { Model, Schema } from 'mongoose';
import { IEntry } from '../interfaces';

export interface EntryDB extends IEntry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} no es un estado permitido.',
    },
    default: 'pending',
    required: true,
  },
});

const EntryModel: Model<EntryDB> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
