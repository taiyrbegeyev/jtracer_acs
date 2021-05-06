import encrypt from 'mongoose-encryption';
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

const encryptionKey = process.env.ENCRYPTION_KEY;
const signingKey = process.env.SIGNING_KEY;

// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods.
invitationTokenSchema.plugin(encrypt, {
  encryptionKey,
  signingKey,
  excludeFromEncryption: ['email']
});

export const invitationTokenModel = mongoose.model<
  IInvitationToken & mongoose.Document
>('InvitationToken', invitationTokenSchema);
