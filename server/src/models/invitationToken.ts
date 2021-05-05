import * as mongoose from 'mongoose';

export interface IInvitationToken {
  token: String;
  email: String;
  creationDate: Date;
}

const invitationTokenSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  token: {
    type: String,
    unique: true
  },
  creationDate: { type: Date, expires: '1440m', default: Date.now }
});

export const invitationTokenModel = mongoose.model<
  IInvitationToken & mongoose.Document
>('InvitationToken', invitationTokenSchema);
