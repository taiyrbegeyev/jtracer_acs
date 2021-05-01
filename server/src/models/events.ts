import * as mongoose from 'mongoose';

export interface IEvent {
  eventName: String;
  eventCapacity: Number;
  organizers: Array<mongoose.Types.ObjectId>;
  qrCode: String;
  creationDate: Date;
}

const eventSchema: mongoose.Schema = new mongoose.Schema({
  eventName: {
    type: String,
    unique: true
  },
  eventCapacity: Number,
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
  creationDate: { type: Date, default: Date.now }
});

export const eventModel = mongoose.model<IEvent & mongoose.Document>(
  'Event',
  eventSchema
);
