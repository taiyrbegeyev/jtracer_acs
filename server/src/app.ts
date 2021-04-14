import dotenv from 'dotenv';
import express from 'express';
import Controller from 'interfaces/controller';
import mongoose from 'mongoose';
import { log } from './utils/logger';

dotenv.config();

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    App.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    // this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(process.env.PORT, () => {
      log.info(
        `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`
      );
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    // this.app.use(cookieParser());
  }

  // private initializeErrorHandling() {
  //   // this.app.use(errorMiddleware);
  // }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private static connectToTheDatabase() {
    const { APP_USER, APP_PWD, DB_NAME } = process.env;
    const MONGO_URI = `mongodb://${APP_USER}:${APP_PWD}@127.0.0.1:27017/${DB_NAME}?authSource=admin`;
    try {
      mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
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
