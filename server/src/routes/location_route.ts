import { Router } from 'express';
import LocationController from 'controllers/location_controller/location_controller';
import { authHandler } from 'middlewares/auth_handler';
import { locationManager } from 'middlewares/authorization_handler';
/**
 * LocationRouter
 */
export default class LocationRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get(
      '/locations',
      [authHandler, locationManager],
      LocationController.getLocations
    );

    this.router.get(
      '/locations/:id',
      [authHandler, locationManager],
      LocationController.getLocation
    );

    this.router.post(
      '/locations',
      [authHandler, locationManager],
      LocationController.postLocation
    );

    this.router.patch(
      '/locations/:id',
      [authHandler, locationManager],
      LocationController.editLocation
    );

    this.router.delete(
      '/locations/:id',
      [authHandler, locationManager],
      LocationController.deleteLocation
    );
  }
}
