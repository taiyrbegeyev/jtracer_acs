import { EventErrors } from 'controllers/event_controller/event_errors';
import express from 'express';
import { checkInModel } from 'models/checkIns';
import { eventModel } from 'models/events';
import mongoose from 'mongoose';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import CheckInValidator from 'validators/checkIn_validator';

class CheckInController {
  /**
   * Create an check in for a given event
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async postCheckIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = CheckInValidator.checkInSchema.validate(req.body, {
        abortEarly: false
      });
      if (validate.error) {
        throw validate.error;
      }
      const {
        eventId,
        eventDuration,
        email,
        isGuest,
        phoneNumber,
        zipCode
      } = validate.value;

      const event = await eventModel.findById(mongoose.Types.ObjectId(eventId));
      if (!event) {
        throw new AppError(EventErrors.EVENT_NOT_EXISTS);
      }

      const checkInTime = new Date(Date.now());
      const checkOutTime = new Date(
        checkInTime.getTime() + eventDuration * 60 * 1000 // convert to milliseconds
      );
      const checkInDay = new Date(checkInTime)
        .toLocaleString('de-DE')
        .split(',')[0];
      // check if the a document for the current day is created
      // let date = await checkInModel.find({ checkInDay });
      // if (!date) {
      //   date = await checkInModel.create({ checkInDay, checkInsData: [] });
      // }
      await checkInModel.findOneAndUpdate(
        { checkInDay },
        {
          $push: {
            checkInsData: {
              eventId,
              email,
              isGuest,
              phoneNumber,
              zipCode,
              checkInTime,
              checkOutTime
            }
          }
        },
        { upsert: true }
      );

      return sendResponse(res, {
        message: 'Check-In is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }
}

export default new CheckInController();
