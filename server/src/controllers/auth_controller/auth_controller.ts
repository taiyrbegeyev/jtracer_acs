import config from 'config';
import { ModeratorErrors } from 'controllers/moderator_controller/moderator_errors';
import * as express from 'express';
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

          res.cookie('accessToken', accessToken, {
            maxAge: config.auth.access_token_life * 1000, // convert from seconds to milliseconds
            httpOnly: true,
            secure: false
          });
          const response = {
            message: 'Login is successful'
          };

          return sendResponse(res, response);
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
      const { emailToken, password } = validate.value;

      const { id } = AuthService.decodeJWTtoken(
        emailToken,
        config.auth.email_token_secret
      ) as any;
      const isModeratorExists = await moderatorModel.findOne({ _id: id });
      if (!isModeratorExists) {
        throw new AppError(ModeratorErrors.MODERATOR_NOT_EXISTS);
      }

      const isModeratorRegistered = await moderatorModel.findOne({
        _id: id,
        isRegistered: true
      });
      if (isModeratorRegistered) {
        throw new AppError(ModeratorErrors.MODERATOR_EXISTS);
      }

      const hash = AuthService.hashPassword(password);
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
    let accessToken;
    try {
      accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new AppError(AuthErrors.NO_ACCESS_TOKEN_PROVIDED);
      }
    } catch (err) {
      return next(createError(err));
    }

    let decoded;
    try {
      decoded = AuthService.decodeJWTtoken(
        accessToken,
        config.auth.access_token_secret
      ) as any;
    } catch (err) {
      return next(createError(AuthErrors.INVALID_ACCESS_TOKEN_PROVIDED));
    }

    // look up the moderator's refresh token
    let moderator;
    try {
      const { id } = decoded;
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
    const newAccessToken = AuthService.generateJWTtoken(
      config.auth.access_token_secret,
      config.auth.access_token_life,
      decoded
    );

    res.cookie('accessToken', newAccessToken, {
      maxAge: config.auth.access_token_life * 1000, // convert from seconds to milliseconds
      httpOnly: true,
      secure: false
    });
    const response = {
      message: 'Refresh token is successful'
    };

    return sendResponse(res, response);
  }
}

export default new AuthController();
