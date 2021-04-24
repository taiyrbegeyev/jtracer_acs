import * as express from 'express';
import { locationModel } from 'models/locations';
import mongoose from 'mongoose';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import LocationValidator from 'validators/location_validator';
import { LocationErrors } from './location_errors';

class LocationController {
  /**
   * Get all locations
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async getLocations(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const locations = await locationModel.find();
      return sendResponse(res, locations, 200);
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Create a location
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async postLocation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = LocationValidator.locationSchema.validate(req.body, {
        abortEarly: false
      });
      if (validate.error) {
        throw validate.error;
      }

      const { locationName, capacity } = validate.value;
      const location = await locationModel.findOne({ locationName });
      if (location) {
        throw new AppError(LocationErrors.LOCATION_NAME_EXISTS);
      }

      await locationModel.create({
        locationName,
        capacity
      });

      return sendResponse(res, {
        message: 'Location creation is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Edit a location
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async editLocation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const validate = LocationValidator.locationSchema.validate(req.body, {
        abortEarly: false
      });
      if (validate.error) {
        throw validate.error;
      }

      const { locationId } = req.params;
      const { locationName, capacity } = validate.value;
      const location = await locationModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(locationId),
        {
          locationName,
          capacity
        }
      );
      if (!location) {
        throw new AppError(LocationErrors.LOCATION_NOT_EXISTS);
      }

      return sendResponse(res, {
        message: 'Location modification is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }

  /**
   * Delete a location
   *
   * @param req - express.Request
   * @param res - express.Response
   * @param next - express.NextFunction
   */
  public async deleteLocation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    try {
      const { locationId } = req.params;
      const location = await locationModel.findByIdAndDelete(locationId);
      if (!location) {
        throw new AppError(LocationErrors.LOCATION_NOT_EXISTS);
      }

      return sendResponse(res, {
        message: 'Location deletion is successful.'
      });
    } catch (err) {
      return next(createError(err));
    }
  }
}

export default new LocationController();
