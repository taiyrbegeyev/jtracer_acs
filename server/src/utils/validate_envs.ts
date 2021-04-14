import { cleanEnv, port, str, host } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    PORT: port(),
    MONGO_INITDB_ROOT_USERNAME: str(),
    MONGO_INITDB_ROOT_PASSWORD: str(),
    APP_USER: str(),
    APP_PWD: str(),
    DB_NAME: str(),
    MONGO_HOSTNAME: host(),
    MONGO_PORT: port()
  });
}

export default validateEnv;
