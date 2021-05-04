import config from 'config';
import { ModeratorErrors } from 'controllers/moderator_controller/moderator_errors';
import * as express from 'express';
import { invitationTokenModel } from 'models/invitationToken';
import { moderatorModel } from 'models/moderators';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import AuthService from 'services/auth_service';
import AuthValidator from 'validators/auth_validator';
import { AuthErrors } from './auth_errors';

class AuthController {
  /**
   * Log in
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
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
        throw new AppError(AuthErrors.WRONG_CREDENTIALS);
      }

      let isPasswordMatching;
      return moderator.comparePassword(
        password,
        async (err: Error, match: boolean) => {
          isPasswordMatching = match;

          if (!isPasswordMatching) {
            return next(
              createError(new AppError(AuthErrors.WRONG_CREDENTIALS))
            );
          }

          const payload = {
            id: moderator._id,
            email: moderator.email,
            roles: moderator.roles
          };
          const accessToken = AuthService.generateJWTtoken(
            config.auth.access_token_secret,
            config.auth.access_token_life,
            payload
          );
          const refreshToken = AuthService.generateJWTtoken(
            config.auth.refresh_token_secret,
            config.auth.refresh_token_life,
            payload
          );

          // store the refresh token in the moderators collection
          moderator.refreshToken = refreshToken;
          await moderator.save();

          const accessTokenMaxAge = config.auth.access_token_life * 1000;
          res.cookie('accessToken', accessToken, {
            maxAge: accessTokenMaxAge, // convert from seconds to milliseconds
            httpOnly: true,
            secure: false
          });
          return sendResponse(res, accessTokenMaxAge);
        }
      );
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Log out
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async logout(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    res.cookie('accessToken', '', {
      httpOnly: true,
      expires: new Date(0)
    });

    return sendResponse(res, {
      message: 'Logout is successful'
    });
  }

  /**
   * Register
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
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
      if (validate.error) {
        throw validate.error;
      }
      const { emailToken, email, password } = validate.value;

      const invitationToken = await invitationTokenModel.findOne({
        email,
        token: emailToken
      });
      if (!invitationToken) {
        throw new AppError(AuthErrors.REGISTER_EMAIL_TOKEN_NOT_EXISTS);
      }

      const hash = AuthService.hashPassword(password);
      await moderatorModel.updateOne(
        { email },
        {
          $set: {
            isRegistered: true,
            registrationDate: new Date(Date.now()),
            hash
          }
        }
      );

      // deactivate the token
      await invitationToken.remove();

      return sendResponse(res, {
        message: 'Registration is successful'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Create a refresh token.
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async refreshToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    // look up the moderator's refresh token
    let moderator;
    try {
      const { id } = res.locals;
      moderator = await moderatorModel.findOne({ _id: id });
      if (!moderator) {
        throw new AppError(ModeratorErrors.MODERATOR_NOT_EXISTS);
      }
    } catch (err) {
      return next(createError(err));
    }

    // verify the refresh token
    try {
      AuthService.decodeJWTtoken(
        moderator.refreshToken,
        config.auth.refresh_token_secret
      ) as any;
    } catch (err) {
      return next(createError(AuthErrors.INVALID_ACCESS_TOKEN_PROVIDED));
    }

    // generate a new access token
    const payload = {
      id: moderator._id,
      email: moderator.email,
      roles: moderator.roles
    };
    const newAccessToken = AuthService.generateJWTtoken(
      config.auth.access_token_secret,
      config.auth.access_token_life,
      payload
    );

    const accessTokenMaxAge = config.auth.access_token_life * 1000;
    res.cookie('accessToken', newAccessToken, {
      maxAge: accessTokenMaxAge, // convert from seconds to milliseconds
      httpOnly: true,
      secure: false
    });
    return sendResponse(res, accessTokenMaxAge);
  }
}

export default new AuthController();
