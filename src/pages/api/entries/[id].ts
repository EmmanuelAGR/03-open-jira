import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, EntryDB } from '../../../models';

type Data = 
  | { message: string }
  | EntryDB;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `El id ${id} no es valido.` });
  }

  switch (req.method) {
    case 'GET':
      return getEntry(req, res);

    case 'PUT':
      return putEntry(req, res);

    case 'DELETE':
        return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: 'Endpoint no existe.' });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entryById = await Entry.findById(id);

    if (!entryById) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: `No existe ninguna tarea con ese id ${id}` });
    }

    await db.disconnect();

    return res.status(200).json( entryById );
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return res
      .status(500)
      .json({ message: 'Algo salio mal, revisar consola del servidor.' });
  }
};

const putEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if (!entryToUpdate) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: `No existe ninguna tarea con ese id ${id}` });
    }

    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;

    const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });

    await db.disconnect();

    return res.status(200).json( updatedEntry! );
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return res
      .status(500)
      .json({ message: 'Algo salio mal, revisar consola del servidor.' });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if (!entryToUpdate) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: `No existe ninguna tarea con ese id ${id}` });
    }

    const deletedEntry = await Entry.findByIdAndDelete( id );

    await db.disconnect();

    return res.status(200).json( deletedEntry! );
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return res
      .status(500)
      .json({ message: 'Algo salio mal, revisar consola del servidor.' });
  }
};
