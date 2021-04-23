import config from 'config';
import * as express from 'express';
import { IApp } from 'interfaces/app';
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
  }
}
