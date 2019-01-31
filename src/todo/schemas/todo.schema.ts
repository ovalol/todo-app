import { Schema } from 'mongoose';

export const TodoSchema = new Schema({
    text: { type: String, require: true, index: true },
    checked: { type: Boolean, require: true, index: true },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'todo',
    strict: true,
  });
