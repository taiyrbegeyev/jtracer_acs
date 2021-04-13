import express from 'express';
import { log } from './utils/logger';

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  log.info(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
