import { cleanEnv, makeValidator, port, host } from 'envalid';

const nonEmptryStr = makeValidator((x) => {
  if (x.length > 0) {
    return x;
  }
  throw new Error('Expected non-empty String');
});

const validateEnv = (): void => {
  cleanEnv(process.env, {
    PORT: port(),
    MONGO_INITDB_ROOT_USERNAME: nonEmptryStr(),
    MONGO_INITDB_ROOT_PASSWORD: nonEmptryStr(),
    APP_USER: nonEmptryStr(),
    APP_PWD: nonEmptryStr(),
    DB_NAME: nonEmptryStr(),
    MONGO_HOSTNAME: host(),
    MONGO_PORT: port()
  });
};

export default validateEnv;
