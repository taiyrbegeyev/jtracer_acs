import config from 'config';
import * as express from 'express';
import { IApp } from 'interfaces/app';
import { AppErrorType } from 'interfaces/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import AuthRouter from './auth_route';
import CheckInRouter from './checkIn_route';
import EventRouter from './event_route';
import LocationRouter from './location_route';
import ModeratorRouter from './moderator_route';

export default class Routes {
  /**
   * @param app - IApp
   * @returns void
   */
  static init(server: IApp): void {
    const router: express.Router = express.Router();

    const { version } = config.api;
    server.app.use('/', router);
    server.app.use(`/api/${version}/auth`, new AuthRouter().router);
    server.app.use(`/api/${version}/`, new LocationRouter().router);
    server.app.use(
      `/api/${version}/locations/:locationId`,
      new EventRouter().router
    );
    server.app.use(`/api/${version}/`, new ModeratorRouter().router);
    server.app.use(`/api/${version}/`, new CheckInRouter().router);

    server.app.all(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) =>
        next(
          createError({
            type: AppErrorType.NETWORK,
            code: 'RESOURCE_NOT_FOUND',
            message: `Can't find ${req.originalUrl} on this server!`,
            statusCode: 404
          })
        )
    );
  }
}
