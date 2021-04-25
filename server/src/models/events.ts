import * as mongoose from 'mongoose';

export interface IEvent {
  eventName: String;
  locationId: String;
  organizers: Array<mongoose.Types.ObjectId>;
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
  creationDate: { type: Date, default: Date.now }
});

export const eventModel = mongoose.model<IEvent & mongoose.Document>(
  'Event',
  eventSchema
);
