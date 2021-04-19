import * as express from 'express';
import { moderatorModel } from 'models/moderators';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import AuthValidator from 'validators/authValidator';
import { Errors } from './error';

class AuthController {
  /**
   * Log in
   *
   * @param {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */
  // eslint-disable-next-line class-methods-use-this
  public async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = AuthValidator.loginSchema.validate(req.body, {
        abortEarly: false
      });
      if (validate.error) {
        throw validate.error;
      }

      const { email, password } = validate.value;
      const user = await moderatorModel.findOne({
        email,
        isRegistered: true
      });

      if (!user) {
        throw new AppError(Errors.WRONG_CREDENTIALS);
      }

      let isPasswordMatching;
      return user.comparePassword(password, (err: Error, match: boolean) => {
        isPasswordMatching = match;

        if (!isPasswordMatching) {
          return next(createError(new AppError(Errors.WRONG_CREDENTIALS)));
        }

        return sendResponse(res, { message: 'Login is successful' });
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Create a moderator.
   *
   * @param {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */
  // eslint-disable-next-line class-methods-use-this
  public async createModerator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = AuthValidator.createModeratorSchema.validate(req.body, {
        abortEarly: false
      });
      const { email } = validate.value;

      const isUserExists = await moderatorModel.findOne({
        email,
        isRegistered: true
      });

      if (isUserExists) {
        throw new AppError(Errors.EMAIL_ALREADY_TAKEN);
      }

      // value.password = passwordHash.generate(value.password);
      // let user: any = await UserModel.create(value);

      // let emailToken = AuthService.emailToken(user._id);

      // Mailer.sendMail(value.email, 'EMAIL VERIFICATION', {
      //   name: user.name,
      //   url: config.envConfig.EMAIL_VERIFICATION_URL + '/' + emailToken
      // });
      return sendResponse(res, { message: 'Registration is successful' });
    } catch (err) {
      return next(createError(err));
    }
  }
}

export default new AuthController();
