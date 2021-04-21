import { Router } from 'express';
import AuthController from 'controllers/authController/auth_controller';
import { authHandler, moderatorManager } from 'middlewares/auth_handler';
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
    this.router.post('/register', AuthController.register);
    this.router.post(
      '/createModerator',
      [authHandler, moderatorManager],
      AuthController.createModerator
    );
    // this.router.post('/signup', AuthController.signUp);
    // this.router.post('/verify/email/:token', AuthController.verifyEmail);
    // this.router.post('/forgotPassword', AuthController.forgotPassword);
    // this.router.post('/reset/:token', AuthController.resetPassword);
  }
}
