import express from 'express';

import { httpMiddleware, logger } from './logger.mjs';
import { metricsEndpoint, userAccessCounter } from './metrics.mjs';

const app = express();
app.use(httpMiddleware);

app.get('/', async (req, res) => {
  userAccessCounter.inc();
  try {
    res.set('Content-Type', 'text/plain');
    res.end('Hello World!');
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get('/metrics', metricsEndpoint);

await app.listen(4001, '0.0.0.0');
logger.info('Server listening on 0.0.0.0:4001');
