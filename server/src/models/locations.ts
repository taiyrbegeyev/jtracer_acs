import * as mongoose from 'mongoose';

export interface ILocationInterface {
  locationName: String;
  capacity: Number;
  creationDate: Date;
}

const locationSchema: mongoose.Schema = new mongoose.Schema({
  locationName: {
    type: String,
    unique: true
  },
  capacity: Number,
  creationDate: { type: Date, default: Date.now }
});

export const locationModel = mongoose.model<
  ILocationInterface & mongoose.Document
>('Location', locationSchema);
