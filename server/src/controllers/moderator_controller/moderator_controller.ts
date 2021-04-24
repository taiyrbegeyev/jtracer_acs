/* eslint-disable */
import * as express from 'express';
import { moderatorModel } from 'models/moderators';
import AuthService from 'services/auth_service';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import ModeratorValidator from 'validators/moderator_validator';
import { ModeratorErrors } from './moderator_errors';

class ModeratorController {
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
  ): Promise<any> {}

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
  ): Promise<any> {}

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
  ): Promise<any> {}
}

export default new ModeratorController();
