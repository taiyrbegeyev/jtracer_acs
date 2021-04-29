import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Routes from 'routes';
import { errorHandler } from 'middlewares/error_handler';
import { log } from 'utils/logger';

dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    App.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(process.env.API_PORT, () => {
      log.info(
        `⚡️[server]: Server is running at https://localhost:${process.env.API_PORT}`
      );
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        credentials: true,
        origin: true
      })
    );
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
    process.on('unhandledRejection', (err: Error) => {
      log.error(err.name, err.message);
      log.error('UNHANDLED REJECTION! 💥 Shutting down...');
      process.exit();
    });
  }

  private initializeRoutes() {
    Routes.init(this);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static connectToTheDatabase() {
    const {
      APP_USER,
      APP_PWD,
      DB_NAME,
      MONGO_HOSTNAME,
      MONGO_PORT
    } = process.env;

    const MONGO_URI = `mongodb://${APP_USER}:${APP_PWD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${DB_NAME}?authSource=admin`;
    try {
      mongoose.connect(MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
    } catch (err) {
      log.error(err);
    }
    const db = mongoose.connection;

    db.on('connecting', () => {
      log.info('MongoDB :: connecting');
    });

    db.on('error', (error) => {
      log.error(`MongoDB :: connection ${error}`);
      mongoose.disconnect();
    });

    db.on('connected', () => {
      log.info('MongoDB :: connected');
    });

    db.once('open', () => {
      log.info('MongoDB :: connection opened');
    });

    db.on('reconnected', () => {
      log.info('MongoDB :: reconnected');
    });

    db.on('reconnectFailed', () => {
      log.error('MongoDB :: reconnectFailed');
    });

    db.on('disconnected', () => {
      log.info('MongoDB :: disconnected');
    });

    db.on('fullsetup', () => {
      log.info('MongoDB :: reconnecting... %d');
    });
  }
}

export default App;
