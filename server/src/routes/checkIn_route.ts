import { Router } from 'express';
import CheckInController from 'controllers/checkIn_controller/checkIn_controller';
import { authHandler } from 'middlewares/auth_handler';
import {
  infectionReportManager,
  viewer
} from 'middlewares/authorization_handler';
/**
 * CheckInRouter
 */
export default class CheckInRouter {
  public router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.get(
      '/events/:eventId/checkIns',
      [authHandler, viewer],
      CheckInController.getCurrentCheckIns
    );

    this.router.get(
      '/checkIns',
      [authHandler, infectionReportManager],
      CheckInController.getCheckIns
    );

    this.router.post('/checkIns', CheckInController.postCheckIn);

    this.router.get(
      '/checkIns/trace',
      [authHandler, infectionReportManager],
      CheckInController.traceContacts
    );
  }
}
