import config from 'config';
import * as express from 'express';
import { moderatorModel } from 'models/moderators';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import AuthServices from 'services/auth_service';
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
      const moderator = await moderatorModel.findOne({
        email,
        isRegistered: true
      });

      if (!moderator) {
        throw new AppError(Errors.WRONG_CREDENTIALS);
      }

      let isPasswordMatching;
      return moderator.comparePassword(
        password,
        async (err: Error, match: boolean) => {
          isPasswordMatching = match;

          if (!isPasswordMatching) {
            return next(createError(new AppError(Errors.WRONG_CREDENTIALS)));
          }

          const accessToken = AuthServices.generateJWTtoken(
            moderator,
            config.api.access_token_secret,
            config.api.access_token_life
          );

          const refreshToken = AuthServices.generateJWTtoken(
            moderator,
            config.api.refresh_token_secret,
            config.api.refresh_token_life
          );

          res.cookie('accessToken', accessToken, {
            maxAge: (config.api.access_token_life as number) * 1000, // convert from seconds to milliseconds
            httpOnly: true,
            secure: false
          });

          // store the refresh token in the moderators collection
          moderator.refreshToken = refreshToken;
          await moderator.save();

          const response = {
            message: 'Login is successful',
            accessToken,
            refreshToken
          };

          return sendResponse(res, response);
        }
      );
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
