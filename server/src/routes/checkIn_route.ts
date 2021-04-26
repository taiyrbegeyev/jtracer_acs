import { Router } from 'express';
import CheckInController from 'controllers/checkIn_controller/checkIn_controller';
import ContactTracingController from 'controllers/contact_tracing_controller/contact_tracing_controller';
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
      '/locations/:locationId/events/:eventId/checkIns',
      // [authHandler, locationManager],
      CheckInController.getCurrentCheckIns
    );

    this.router.post(
      '/checkIns',
      // [authHandler, locationManager],
      CheckInController.postCheckIn
    );

    this.router.get(
      '/checkins',
      // [authHandler, infectionReportManager],
      CheckInController.getCheckIns
    );

    this.router.get(
      '/checkins/trace',
      // [authHandler, infectionReportManager],
      ContactTracingController.contactTracing
    );
  }
}
