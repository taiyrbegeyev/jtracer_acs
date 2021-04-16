import * as mongoose from 'mongoose';

export enum Role {
  Viewer = 'Viewer',
  LocationManager = 'LocationManager',
  EventManager = 'EventManager',
  ModeratorManager = 'ModeratorManager',
  LogManager = 'LogManager',
  InfectionReportManager = 'InfectionReportManager'
}

export interface IModeratorInterface {
  email: String;
  password: String;
  salt: String;
  firstName: String;
  lastName: String;
  roles: Array<Role>;
  isRegistered: Boolean;
  invitationDate: Date;
  registrationDate: Date;
}

const moderatorSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  salt: String,
  firstName: String,
  lastName: String,
  roles: {
    type: [String],
    enum: Object.keys(Role),
    default: ['Viewer']
  },
  isRegistered: { type: Boolean, default: false },
  invitationDate: { type: Date, default: Date.now },
  registrationDate: Date
});

export const moderatorModel = mongoose.model<
  IModeratorInterface & mongoose.Document
>('Moderator', moderatorSchema);
