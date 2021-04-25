import * as mongoose from 'mongoose';

export enum Status {
  Approved = 'Approved',
  Declined = 'Declined',
  Pending = 'Pending'
}

export interface IRequest {
  moderatorId: String;
  attendeeInfo: String;
  startDate: Date;
  endDate: Date;
  status: Status;
  approvedBy: Array<mongoose.Types.ObjectId>;
  declinedBy: Array<mongoose.Types.ObjectId>;
  requestDate: Date;
}

const requestSchema: mongoose.Schema = new mongoose.Schema({
  moderatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moderator'
  },
  attendeeInfo: String,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: Object.keys(Status),
    default: Status.Pending
  },
  approvedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Moderator'
    }
  ],
  declinedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Moderator'
    }
  ],
  requestDate: { type: Date, default: Date.now }
});

export const requestModel = mongoose.model<IRequest & mongoose.Document>(
  'Request',
  requestSchema
);
