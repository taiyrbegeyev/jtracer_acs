import validateEnv from 'utils/validate_envs';
import App from './app';

validateEnv();
const app = new App();
app.listen();
