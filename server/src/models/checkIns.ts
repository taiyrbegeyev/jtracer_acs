import * as mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';
import moment from 'moment';

export interface ICheckIn extends mongoose.Document {
  checkInDay: string; // expected output: YYYY-MM-DD, moment().format("YYYY-MM-DD")
  checkInsData: Array<ICheckInData>;
}

export interface ICheckInData {
  eventId: String;
  email: String;
  isGuest: Boolean;
  phoneNumber: String;
  zipCode: String;
  checkInTime: Date;
  checkOutTime: Date;
}

const checkInSchema: mongoose.Schema = new mongoose.Schema({
  checkInDay: { type: String, unique: true },
  checkInsData: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      },
      email: String,
      isGuest: Boolean,
      phoneNumber: String,
      zipCode: String,
      checkInTime: { type: Date, expires: '30d', default: moment.utc() }, // expires in 30 days
      checkOutTime: Date
    }
  ]
});

checkInSchema.pre<ICheckIn>('save', function save(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const checkIn = this;
  // eslint-disable-next-line prefer-destructuring
  checkIn.checkInDay = moment.utc().format('YYYY-MM-DD');

  return next();
});

const encryptionKey = process.env.ENCRYPTION_KEY;
const signingKey = process.env.SIGNING_KEY;

// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods.
checkInSchema.plugin(encrypt, {
  encryptionKey,
  signingKey,
  excludeFromEncryption: [
    'checkInDay',
    'checkInsData.checkInTime',
    'checkInsData.checkOutTime',
    'checkInsData.email',
    'checkInsData.eventId'
  ]
});

export const checkInModel = mongoose.model<ICheckIn & mongoose.Document>(
  'CheckIn',
  checkInSchema
);
