import pinoHttp from 'pino-http';
import pino from 'pino';

export const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          hideObject: true,
        },
      },
      {
        target: 'pino/file',
        options: { destination: './log/testapp.log' },
      },
    ],
  },
});

export const httpMiddleware = pinoHttp({
  logger,
  autoLogging: {
    ignorePaths: ['/metrics'],
  },
});
