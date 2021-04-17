import * as express from 'express';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import AuthValidator from 'validators/authValidator';
import { Errors } from './error';

class AuthController {
  /**
   * Signup user takes name, email and password
   *
   * @param {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */

  static async createModerator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = AuthValidator.createModeratorSchema.validate(req.body);
      if (validate.error) {
        throw new AppError(Errors.EMAIL_ALREADY_TAKEN);
        // return res.status(422).json({
        //   error: validate.error.details[0].message + ''
        // });
      }
      // let value = validate.value;
      // let isUserExists = await UserModel.findOne({
      //   email: value.email,
      //   isVerified: true
      // });
      // if (isUserExists) {
      //   return res.status(422).send({ message: Messages.ERROR_422 });
      // }

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
