import * as express from 'express';
import { moderatorModel } from 'models/moderators';
import mongoose from 'mongoose';
import AuthService from 'services/auth_service';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import ModeratorValidator from 'validators/moderator_validator';
import { ModeratorErrors } from './moderator_errors';

class ModeratorController {
  /**
   * Get a moderator
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async getModerator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const { email } = res.locals;
      // exclude hash from the response object
      const moderators = await moderatorModel
        .findOne({ email })
        .select('-hash')
        .select('-refreshToken');
      return sendResponse(res, moderators, 200);
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Get all moderators
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async getModerators(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      // exclude hash from the response object
      const moderators = await moderatorModel
        .find()
        .select('-hash')
        .select('-refreshToken');
      return sendResponse(res, moderators, 200);
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Create a moderator.
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async postModerator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = ModeratorValidator.moderatorSchema.validate(req.body, {
        abortEarly: false
      });
      if (validate.error) {
        throw validate.error;
      }

      const { email, firstName, lastName, roles, inviteeId } = validate.value;
      const isModeratorExists = await moderatorModel.findOne({ email });
      if (isModeratorExists) {
        throw new AppError(ModeratorErrors.MODERATOR_EXISTS);
      }

      const moderator = await moderatorModel.create({
        email,
        firstName,
        lastName,
        roles,
        inviteeId
      });
      await AuthService.sendInvitationEmail(moderator);

      return sendResponse(res, {
        message: 'Moderation creation is successful'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Resend an invitation link
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async resendInvitationLink(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = ModeratorValidator.resendInvitationLinkSchema.validate(
        req.body,
        {
          abortEarly: false
        }
      );
      if (validate.error) {
        throw validate.error;
      }

      const { moderatorId } = validate.value;
      const moderator = await moderatorModel.findOne({ _id: moderatorId });
      if (!moderator) {
        throw new AppError(ModeratorErrors.MODERATOR_EXISTS);
      }

      await AuthService.resendInvitationEmail(moderator);
      return sendResponse(res, {
        message: 'Moderation creation is successful'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Edit a moderator
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async editModerator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = ModeratorValidator.moderatorSchema.validate(req.body, {
        abortEarly: false
      });
      if (validate.error) {
        throw validate.error;
      }

      const { moderatorId } = req.params;
      const { email, firstName, lastName, roles, inviteeId } = validate.value;
      const moderator = await moderatorModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(moderatorId),
        {
          email,
          firstName,
          lastName,
          roles,
          inviteeId
        }
      );
      if (!moderator) {
        throw new AppError(ModeratorErrors.MODERATOR_NOT_EXISTS);
      }

      return sendResponse(res, {
        message: 'Moderator modification is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Delete a moderator
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async deleteModerator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const { moderatorId } = req.params;
      const moderator = await moderatorModel.findByIdAndDelete(moderatorId);
      if (!moderator) {
        throw new AppError(ModeratorErrors.MODERATOR_NOT_EXISTS);
      }

      return sendResponse(res, {
        message: 'Moderator deletion is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }
}

export default new ModeratorController();
