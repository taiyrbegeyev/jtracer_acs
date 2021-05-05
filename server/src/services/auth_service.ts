import config from 'config';
import MailgunFactory from 'mailgun-js';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IModerator } from 'models/moderators';
import { log } from 'utils/logger';
import { v4 as uuidv4 } from 'uuid';
import { invitationTokenModel } from 'models/invitationToken';

class AuthService {
  public mailgun: MailgunFactory.Mailgun;

  constructor() {
    this.mailgun = new MailgunFactory({
      apiKey: config.email.mailgun_api_key,
      domain: config.email.domain_name
    });
  }

  generateJWTtoken(secret: string, tokenLife: string | number, payload: any) {
    return jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: tokenLife
    });
  }

  decodeJWTtoken(token: string, secret: string) {
    return jwt.verify(token, secret);
  }

  async sendInvitationEmail(moderator: IModerator) {
    const token = uuidv4();

    const link = `http://localhost:3000/signup?token=${token}&email=${moderator.email}`;
    const data: MailgunFactory.messages.SendData = {
      from: 'JTracer<noreply@jtracer.codes>',
      to: moderator.email,
      subject: 'Welcome to the JTracer ACS',
      text: `Dear ${moderator.firstName} ${moderator.lastName},\n\nHere is the link to join JTracer ACS\n\n${link}`
    };

    this.mailgun.messages().send(data, async (err, body) => {
      if (err) {
        log.error(err);
      }
      log.info(body);
      // save the token in a designated collection
      await invitationTokenModel.create({
        email: moderator.email,
        token
      });
    });
  }

  async resendInvitationEmail(moderator: IModerator) {
    // deactivate the previous token
    await invitationTokenModel.findOneAndDelete({ email: moderator.email });
    await this.sendInvitationEmail(moderator);
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, config.auth.saltRounds);
  }
}

export default new AuthService();
