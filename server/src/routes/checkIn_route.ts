import { Router } from 'express';
import CheckInController from 'controllers/checkIn_controller/checkIn_controller';
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
    this.router.post(
      '/checkIns',
      // [authHandler, locationManager],
      CheckInController.postCheckIn
    );
  }
}
