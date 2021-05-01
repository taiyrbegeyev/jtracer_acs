import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export enum Role {
  Viewer = 'Viewer',
  LocationManager = 'LocationManager',
  EventManager = 'EventManager',
  ModeratorManager = 'ModeratorManager',
  LogManager = 'LogManager',
  InfectionReportManager = 'InfectionReportManager'
}

export interface IModerator extends mongoose.Document {
  email: string;
  hash: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
  isRegistered: Boolean;
  inviteeId: string;
  invitationDate: Date;
  registrationDate: Date;
  comparePassword: (password: string, callback: Function) => void;
}

const moderatorSchema = new mongoose.Schema<IModerator>({
  email: {
    type: String,
    unique: true
  },
  hash: {
    type: String
  },
  refreshToken: {
    type: String
  },
  firstName: String,
  lastName: String,
  roles: {
    type: [String],
    enum: Object.keys(Role),
    default: ['Viewer']
  },
  inviteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moderator'
  },
  isRegistered: { type: Boolean, default: false },
  invitationDate: { type: Date, default: Date.now },
  registrationDate: Date
});

moderatorSchema.methods.comparePassword = function (
  password: string,
  callback: Function
): void {
  bcrypt.compare(password, this.hash, (err, isMatch) => callback(err, isMatch));
};

export const moderatorModel = mongoose.model<IModerator & mongoose.Document>(
  'Moderator',
  moderatorSchema
);
