import * as mongoose from 'mongoose';

export interface ICheckIn {
  checkInDay: String; // expected output: Wed Jul 28 1993, toDateString
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

export const checkInModel = mongoose.model<ICheckIn & mongoose.Document>(
  'CheckIn',
  checkInSchema
);
