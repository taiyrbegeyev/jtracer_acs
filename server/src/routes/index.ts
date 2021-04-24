import config from 'config';
import * as express from 'express';
import { IApp } from 'interfaces/app';
import { sendResponse } from 'services/error_hanlding/app_response_schema';
import AuthRouter from './auth_route';
import LocationRouter from './location_route';

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

    server.app.all('*', (req: express.Request, res: express.Response) =>
      sendResponse(
        res,
        { message: `Can't find ${req.originalUrl} on this server!` },
        404
      )
    );
  }
}
