import { Router } from 'express';
import EventController from 'controllers/event_controller/event_controller';
import {
  eventManager,
  viewerOrEventManager
} from 'middlewares/authorization_handler';
import { authHandler } from 'middlewares/auth_handler';
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
      [authHandler, viewerOrEventManager],
      EventController.getEvents
    );

    this.router.post(
      '/events',
      [authHandler, eventManager],
      EventController.postEvent
    );

    this.router.patch(
      '/events/:eventId',
      [authHandler, eventManager],
      EventController.editEvent
    );

    this.router.delete(
      '/events/:eventId',
      [authHandler, eventManager],
      EventController.deleteEvent
    );
  }
}
