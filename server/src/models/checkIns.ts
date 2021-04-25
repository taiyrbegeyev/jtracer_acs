import * as mongoose from 'mongoose';

export interface ICheckIn extends mongoose.Document {
  checkInDay: String; // expected output: 25.04.2021, new Date(Date.now()).toLocaleString('de-DE').split(',')[0];
  checkInsData: Array<ICheckInData>;
}

interface ICheckInData {
  eventId: String;
  email: String;
  isGuest: Boolean;
  phoneNumber: String;
  zipCode: String;
  checkInTime: Date;
  checkOutTime: Date;
}

const checkInDataSchema: mongoose.Schema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  email: String,
  isGuest: Boolean,
  phoneNumber: String,
  zipCode: String,
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: Date
});

const checkInSchema: mongoose.Schema = new mongoose.Schema({
  checkInDay: {
    type: String,
    unique: true
  },
  checkInsData: [checkInDataSchema]
});

checkInSchema.pre<ICheckIn>('save', function save(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const checkIn = this;
  // eslint-disable-next-line prefer-destructuring
  checkIn.checkInDay = new Date(Date.now())
    .toLocaleString('de-DE')
    .split(',')[0];

  return next();
});

export const checkInModel = mongoose.model<ICheckIn & mongoose.Document>(
  'CheckIn',
  checkInSchema
);
