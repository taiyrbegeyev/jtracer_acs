import config from 'config';
import MailgunFactory from 'mailgun-js';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IModerator } from 'models/moderators';
import { log } from 'utils/logger';

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
    const payload = {
      id: moderator._id
    };

    const emailToken = this.generateJWTtoken(
      config.auth.email_token_secret,
      config.auth.email_token_life,
      payload
    );

    const data: MailgunFactory.messages.SendData = {
      from: 'JTracer<noreply@jtracer.codes>',
      to: moderator.email,
      subject: 'Welcome to the JTracer ACS',
      text: `Here is the link to join JTracer ACS ${emailToken}`
    };

    this.mailgun.messages().send(data, (err, body) => {
      if (err) {
        log.error(err);
      }
      log.info(body);
    });
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, config.auth.saltRounds);
  }
}

export default new AuthService();
