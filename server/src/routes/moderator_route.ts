import { Router } from 'express';
import ModeratorController from 'controllers/moderator_controller/moderator_controller';
/**
 * ModeratorRouter
 */
export default class ModeratorRouter {
  public router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.get(
      '/moderators',
      // [authHandler, locationManager],
      ModeratorController.getModerators
    );

    this.router.post(
      '/moderators',
      // [authHandler, locationManager],
      ModeratorController.postModerator
    );

    this.router.patch(
      '/moderators/:moderatorId',
      // [authHandler, locationManager],
      ModeratorController.editModerator
    );

    this.router.delete(
      '/moderators/:moderatorId',
      // [authHandler, locationManager],
      ModeratorController.deleteModerator
    );
  }
}
