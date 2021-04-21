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

          const payload = {
            id: moderator._id,
            email: moderator.email,
            roles: moderator.roles
          };
          const accessToken = AuthServices.generateJWTtoken(
            config.auth.access_token_secret,
            config.auth.access_token_life,
            payload
          );
          const refreshToken = AuthServices.generateJWTtoken(
            config.auth.refresh_token_secret,
            config.auth.refresh_token_life,
            payload
          );

          res.cookie('accessToken', accessToken, {
            maxAge: config.auth.access_token_life * 1000, // convert from seconds to milliseconds
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
   * Register
   *
   * @param {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */
  public async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = AuthValidator.registerSchema.validate(req.body, {
        abortEarly: false
      });
      const { emailToken, password } = validate.value;

      const { id } = AuthServices.decodeJWTtoken(
        emailToken,
        config.auth.email_token_secret
      ) as any;
      const isModeratorExists = await moderatorModel.findOne({ _id: id });
      if (!isModeratorExists) {
        throw new AppError(Errors.MODERATOR_DOES_NOT_EXIST);
      }

      const isModeratorRegistered = await moderatorModel.findOne({
        _id: id,
        isRegistered: true
      });
      if (isModeratorRegistered) {
        throw new AppError(Errors.MODERATOR_ALREADY_REGISTERED);
      }

      const hash = AuthServices.hashPassword(password);
      await moderatorModel.updateOne(
        { _id: id },
        {
          $set: {
            isRegistered: true,
            registrationDate: new Date(Date.now()),
            hash
          }
        }
      );

      return sendResponse(res, {
        message: 'Registration is successful'
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
  public async createModerator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = AuthValidator.createModeratorSchema.validate(req.body, {
        abortEarly: false
      });
      const { email, firstName, lastName, roles, inviteeId } = validate.value;

      const isModeratorExists = await moderatorModel.findOne({ email });
      if (isModeratorExists) {
        throw new AppError(Errors.EMAIL_ALREADY_TAKEN);
      }

      const moderator = await moderatorModel.create({
        email,
        firstName,
        lastName,
        roles,
        inviteeId
      });
      await AuthServices.sendInvitationEmail(moderator);

      return sendResponse(res, {
        message: 'Moderation creation is successful'
      });
    } catch (err) {
      return next(createError(err));
    }
  }
}

export default new AuthController();
