import { Router } from 'express';
import EventController from 'controllers/event_controller/event_controller';
/**
 * EventRouter
 */
export default class EventRouter {
  public router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.get(
      '/events',
      // [authHandler, locationManager],
      EventController.getEvents
    );

    this.router.post(
      '/events',
      // [authHandler, locationManager],
      EventController.postEvent
    );

    this.router.patch(
      '/events/:eventId',
      // [authHandler, locationManager],
      EventController.editEvent
    );

    this.router.delete(
      '/events/:eventId',
      // [authHandler, locationManager],
      EventController.deleteEvent
    );
  }
}
