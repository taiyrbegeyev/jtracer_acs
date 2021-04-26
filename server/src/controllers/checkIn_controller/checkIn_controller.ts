import { EventErrors } from 'controllers/event_controller/event_errors';
import { LocationErrors } from 'controllers/location_controller/location_errors';
import express from 'express';
import { checkInModel, ICheckIn, ICheckInData } from 'models/checkIns';
import { eventModel } from 'models/events';
import { locationModel } from 'models/locations';
import mongoose from 'mongoose';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import { log } from 'utils/logger';
import CheckInValidator from 'validators/checkIn_validator';

class CheckInController {
  /**
   * Get current check-ins for a given event
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async getCurrentCheckIns(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const { locationId, eventId } = req.params;

      const location = await locationModel.findById(locationId);
      if (!location) {
        throw new AppError(LocationErrors.LOCATION_NOT_EXISTS);
      }

      const event = await eventModel.findById(eventId);
      if (!event) {
        throw new AppError(EventErrors.EVENT_NOT_EXISTS);
      }

      const currentDate = new Date(Date.now());
      const checkInDay = currentDate.toLocaleString('de-DE').split(',')[0];

      const checkIns = await checkInModel.find({
        checkInDay,
        'checkInsData.checkOutTime': {
          $gte: currentDate
        }
      });
      const normalizedCheckIns: ICheckInData[] = [];
      checkIns.forEach((elem: ICheckIn) =>
        normalizedCheckIns.push(...elem.checkInsData)
      );

      return sendResponse(res, normalizedCheckIns, 200);
    } catch (err) {
      return next(createError(err));
    }
  }

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
        endTime,
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
      log.debug(`checkInTime: ${checkInTime}`);
      const checkOutTime = new Date(endTime);
      log.debug(`checkOutTime: ${checkOutTime}`);
      const checkInDay = new Date(checkInTime)
        .toLocaleString('de-DE')
        .split(',')[0];
      log.debug(`checkInDay: ${checkInDay}`);

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
        message: 'Check-in is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Trace all contacts of a given email based on start and end dates.
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async getCheckIns(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = CheckInValidator.contactTracingSchema.validate(
        req.body,
        { abortEarly: false }
      );
      if (validate.error) {
        throw validate.error;
      }
      const { attendeeEmail } = validate.value;
      const startDate = new Date(validate.value.startDate);
      const endDate = new Date(validate.value.endDate);

      const checkIns = await checkInModel.find({
        'checkInsData.email': {
          $eq: attendeeEmail
        },
        'checkInsData.checkOutTime': {
          $gte: startDate,
          $lte: endDate
        }
      });
      // restructure checkIns into one array of objects
      const normalizedCheckIns: ICheckInData[] = [];
      checkIns.forEach((elem: ICheckIn) =>
        normalizedCheckIns.push(...elem.checkInsData)
      );

      // iterate through the List of the potential infected person's checkins
      const contactsCheckIns: ICheckInData[] = [];
      normalizedCheckIns.forEach(async (elem: ICheckInData) => {
        await checkInModel.find({
          'checkInsData.eventId': {
            $eq: elem.eventId
          },
          $and: [
            {
              $or: [
                {
                  'checkInsData.checkInTime': {
                    $gte: elem.checkInTime,
                    $lte: elem.checkOutTime
                  }
                }
              ]
            },
            {
              $or: [
                {
                  'checkInsData.checkOutTime': {
                    $gte: elem.checkInTime,
                    $lte: elem.checkOutTime
                  }
                }
              ]
            }
          ]
        });
      });

      return sendResponse(res, contactsCheckIns, 200);
    } catch (err) {
      return next(createError(err));
    }
  }
}

export default new CheckInController();
