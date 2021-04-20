import * as jwt from 'jsonwebtoken';
import { IModerator } from 'models/moderators';

class AuthService {
  generateJWTtoken(
    moderator: IModerator,
    secret: string,
    tokenLife: string | number
  ) {
    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      _id: moderator._id,
      roles: moderator.roles
    };

    return jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: tokenLife
    });
  }
}

export default new AuthService();
