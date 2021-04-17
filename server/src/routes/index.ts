import config from 'config';
import * as express from 'express';
import { IApp } from 'interfaces/app';
import AuthRouter from './auth_route';

export default class Routes {
  /**
   * @param  {IApp} app
   * @returns void
   */
  static init(server: IApp): void {
    const router: express.Router = express.Router();

    const { version } = config.api;
    server.app.use('/', router);
    server.app.use(`/api/${version}/auth`, new AuthRouter().router);
  }
}
