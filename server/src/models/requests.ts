import * as mongoose from 'mongoose';

export interface IRequest {
  moderatorId: String;
  attendeeId: String;
  requestDate: Date;
}

const requestSchema: mongoose.Schema = new mongoose.Schema({
  moderatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moderator'
  },
  attendeeEmail: String,
  requestDate: { type: Date, default: Date.now }
});

export const requestModel = mongoose.model<IRequest & mongoose.Document>(
  'Request',
  requestSchema
);
