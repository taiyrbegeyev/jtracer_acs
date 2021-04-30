import { Router } from 'express';
import ModeratorController from 'controllers/moderator_controller/moderator_controller';
import { authHandler } from 'middlewares/auth_handler';
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
      '/moderator',
      [authHandler],
      ModeratorController.getModerator
    );

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
