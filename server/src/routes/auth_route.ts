import { Router } from 'express';
import AuthController from 'controllers/auth_controller/auth_controller';
import { authHandler } from 'middlewares/auth_handler';
import { moderatorManager } from 'middlewares/authorization_handler';
/**
 * AuthRouter
 */
export default class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.post('/login', AuthController.login);
    this.router.post('/logout', AuthController.logout);
    this.router.post('/register', AuthController.register);
    this.router.post('/refreshToken', AuthController.refreshToken);
    this.router.post(
      '/createModerator',
      [authHandler, moderatorManager],
      AuthController.createModerator
    );

    // this.router.post('/verify/email/:token', AuthController.verifyEmail);
    // this.router.post('/forgotPassword', AuthController.forgotPassword);
    // this.router.post('/reset/:token', AuthController.resetPassword);
  }
}
