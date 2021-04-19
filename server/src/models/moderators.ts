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
  firstName: string;
  lastName: string;
  roles: Array<Role>;
  isRegistered: Boolean;
  invitationDate: Date;
  registrationDate: Date;
  comparePassword: (password: string) => Promise<Boolean>;
}

const moderatorSchema = new mongoose.Schema<IModerator>({
  email: {
    type: String,
    unique: true
  },
  hash: {
    type: String,
    select: false // Omit the hash when returning a moderator
  },
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

/**
 * Password hash middleware.
 */
// coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
// github.com/microsoft/TypeScript-Node-Starter/blob/master/src/models/User.ts
moderatorSchema.pre<IModerator>('save', function save(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (this.isModified('hash') || this.isNew) {
    return bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      }
      return bcrypt.hash(user.hash, salt, (hashError, hash) => {
        if (hashError) {
          return next(hashError);
        }

        user.hash = hash;
        return next();
      });
    });
  }
  return next();
});

moderatorSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  const isPasswordMatching: Boolean = await bcrypt.compare(password, this.hash);
  return isPasswordMatching;
};

export const moderatorModel = mongoose.model<IModerator & mongoose.Document>(
  'Moderator',
  moderatorSchema
);
