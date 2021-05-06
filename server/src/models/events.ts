import encrypt from 'mongoose-encryption';
import * as mongoose from 'mongoose';

export interface IEvent {
  eventName: String;
  eventCapacity: Number;
  organizers: Array<String>;
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
      type: String,
      ref: 'Moderator'
    }
  ],
  qrCode: {
    type: String,
    unique: true
  },
  creationDate: { type: Date, default: Date.now }
});

const encryptionKey = process.env.ENCRYPTION_KEY;
const signingKey = process.env.SIGNING_KEY;

// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods.
eventSchema.plugin(encrypt, {
  encryptionKey,
  signingKey,
  excludeFromEncryption: ['organizers', 'eventName']
});

export const eventModel = mongoose.model<IEvent & mongoose.Document>(
  'Event',
  eventSchema
);
