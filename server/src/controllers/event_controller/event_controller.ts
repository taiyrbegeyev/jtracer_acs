import * as express from 'express';
import { eventModel } from 'models/events';
import mongoose from 'mongoose';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import EventService from 'services/event_service';
import EventValidator from 'validators/event_validator';
import { EventErrors } from './event_errors';

class EventController {
  /**
   * Get all events
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async getEvents(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const events = await eventModel.find();
      return sendResponse(res, events, 200);
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Create an event
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async postEvent(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = EventValidator.eventSchema.validate(req.body, {
        abortEarly: false
      });
      if (validate.error) {
        throw validate.error;
      }

      const { eventName, eventCapacity, organizers } = validate.value;
      const event = await eventModel.findOne({ eventName });
      if (event) {
        throw new AppError(EventErrors.EVENT_NAME_EXISTS);
      }

      // generate _id manually, since it will be embedded into an QR code
      const id = mongoose.Types.ObjectId();
      // create a QR code
      const qrCode = await EventService.generateQRCode(id.toHexString());

      await eventModel.create({
        _id: id,
        eventName,
        eventCapacity,
        organizers,
        qrCode
      });

      return sendResponse(res, {
        message: 'Event creation is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Edit an event
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async editEvent(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = EventValidator.eventSchema.validate(req.body, {
        abortEarly: false
      });
      if (validate.error) {
        throw validate.error;
      }

      const { eventId } = req.params;
      const { eventName, eventCapacity, organizers } = validate.value;
      const event = await eventModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(eventId),
        { eventName, eventCapacity, organizers }
      );
      if (!event) {
        throw new AppError(EventErrors.EVENT_NOT_EXISTS);
      }

      return sendResponse(res, {
        message: 'Event modification is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Delete an event
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async deleteEvent(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const { eventId } = req.params;
      const event = await eventModel.findByIdAndDelete(eventId);
      if (!event) {
        throw new AppError(EventErrors.EVENT_NOT_EXISTS);
      }

      return sendResponse(res, {
        message: 'Event deletion is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }
}

export default new EventController();
