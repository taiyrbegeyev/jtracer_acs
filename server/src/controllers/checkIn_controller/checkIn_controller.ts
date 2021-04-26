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
      let normalizedCheckIns: ICheckInData[] = [];
      checkIns.forEach((elem: ICheckIn) =>
        normalizedCheckIns.push(...elem.checkInsData)
      );
      normalizedCheckIns = normalizedCheckIns.filter(
        (elem: ICheckInData) =>
          // eslint-disable-next-line eqeqeq
          elem.eventId == eventId && elem.checkOutTime >= currentDate
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
        'checkInsData.email': attendeeEmail,
        'checkInsData.checkOutTime': {
          $gte: startDate,
          $lte: endDate
        }
      });

      // even though we run a query on the collection, the returned data
      // (the checkInsData to be more specific) will still include
      // unwanted checkins, because the query is run on the documents, not
      // on the array of objects. So, we will have to filter the list ourselves.
      let normalizedCheckIns: ICheckInData[] = [];
      checkIns.forEach((elem: ICheckIn) =>
        normalizedCheckIns.push(...elem.checkInsData)
      );
      normalizedCheckIns = normalizedCheckIns.filter(
        (elem: ICheckInData) =>
          // eslint-disable-next-line eqeqeq
          elem.email == attendeeEmail &&
          startDate <= elem.checkOutTime &&
          elem.checkOutTime <= endDate
      );

      // iterate through the List of the potential infected person's checkins
      const contactCheckIns: ICheckIn[] = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const elem of normalizedCheckIns) {
        // eslint-disable-next-line no-await-in-loop
        const result = await checkInModel
          .find({
            'checkInsData.eventId': elem.eventId
          })
          .and([
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
          ]);
        contactCheckIns.push(...result);
      }

      // restructure contactCheckIns into one array of objects
      let normalizedContactsCheckIns: ICheckInData[] = [];
      contactCheckIns.forEach((elem: ICheckIn) =>
        normalizedContactsCheckIns.push(...elem.checkInsData)
      );
      normalizedContactsCheckIns = normalizedContactsCheckIns.filter(
        (elem: ICheckInData) =>
          startDate <= elem.checkOutTime &&
          elem.checkOutTime <= endDate &&
          // eslint-disable-next-line eqeqeq
          elem.email != attendeeEmail
      );
      const uniqueNormalizedContactsCheckIns = [
        ...new Map(
          normalizedContactsCheckIns.map((item) => [JSON.stringify(item), item])
        ).values()
      ];

      return sendResponse(res, uniqueNormalizedContactsCheckIns, 200);
    } catch (err) {
      return next(createError(err));
    }
  }
}

export default new CheckInController();
