import { collectDefaultMetrics, register, Counter } from 'prom-client';

collectDefaultMetrics();

export const userAccessCounter = new Counter({
  name: 'test_app_user_access',
  help: 'User accesses the app',
});

export const metricsEndpoint = async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
};
