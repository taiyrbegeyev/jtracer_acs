import * as mongoose from 'mongoose';

export interface IEventInterface {
  eventName: String;
  locationId: String;
  organizers: Array<String>;
  qrCode: String;
  creationDate: Date;
}

const eventSchema: mongoose.Schema = new mongoose.Schema({
  eventName: String,
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  organizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Moderator'
    }
  ],
  qrCode: {
    type: String,
    unique: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

export const eventModel = mongoose.model<IEventInterface & mongoose.Document>(
  'Event',
  eventSchema
);
