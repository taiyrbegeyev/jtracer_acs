import { Router } from 'express';
import LocationController from 'controllers/location_controller/location_controller';
import { locationManager } from 'middlewares/authorization_handler';
import { authHandler } from 'middlewares/auth_handler';
/**
 * LocationRouter
 */
export default class LocationRouter {
  public router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.get(
      '/locations',
      [authHandler, locationManager],
      LocationController.getLocations
    );

    this.router.post(
      '/locations',
      [authHandler, locationManager],
      LocationController.postLocation
    );

    this.router.patch(
      '/locations/:locationId',
      [authHandler, locationManager],
      LocationController.editLocation
    );

    this.router.delete(
      '/locations/:locationId',
      [authHandler, locationManager],
      LocationController.deleteLocation
    );
  }
}
