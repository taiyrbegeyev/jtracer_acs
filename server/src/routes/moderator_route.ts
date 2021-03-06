import { Router } from 'express';
import ModeratorController from 'controllers/moderator_controller/moderator_controller';
import { authHandler } from 'middlewares/auth_handler';
import { moderatorManager } from 'middlewares/authorization_handler';
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
      [authHandler],
      ModeratorController.getModerators
    );

    this.router.post(
      '/moderators',
      [authHandler, moderatorManager],
      ModeratorController.postModerator
    );

    this.router.post(
      '/moderators/resendInvitationLink',
      [authHandler, moderatorManager],
      ModeratorController.resendInvitationLink
    );

    this.router.patch(
      '/moderators/:moderatorId',
      [authHandler, moderatorManager],
      ModeratorController.editModerator
    );

    this.router.delete(
      '/moderators/:moderatorId',
      [authHandler, moderatorManager],
      ModeratorController.deleteModerator
    );
  }
}
