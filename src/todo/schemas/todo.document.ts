import { Document } from 'mongoose';

export interface TodoDocument extends Document {
  readonly text: string;
  readonly checked: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
