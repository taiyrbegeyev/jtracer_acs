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
      // [authHandler, moderatorManager],
      ModeratorController.getModerators
    );

    this.router.post(
      '/moderators',
      // [authHandler, moderatorManager],
      ModeratorController.postModerator
    );

    this.router.patch(
      '/moderators/:moderatorId',
      // [authHandler, moderatorManager],
      ModeratorController.editModerator
    );

    this.router.delete(
      '/moderators/:moderatorId',
      // [authHandler, moderatorManager],
      ModeratorController.deleteModerator
    );
  }
}
