import { Router } from 'express';
import AuthController from 'controllers/auth_controller/auth_controller';
import { authHandler } from 'middlewares/auth_handler';
/**
 * AuthRouter
 */
export default class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.routes();
  }

  public routes(): void {
    this.router.post('/login', AuthController.login);
    this.router.post('/logout', AuthController.logout);
    this.router.post('/register', AuthController.register);
    this.router.get('/verify/emailToken', AuthController.verifyEmailToken);
    this.router.post(
      '/refreshToken',
      [authHandler],
      AuthController.refreshToken
    );

    // this.router.post('/forgotPassword', AuthController.forgotPassword);
    // this.router.post('/reset/:token', AuthController.resetPassword);
  }
}
