// import path from 'path';
// import { createLogger, format, transports } from 'winston';

// import DailyRotateFile from 'winston-daily-rotate-file';

// const { combine, timestamp, label, printf } = format;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   const date = new Date(timestamp);
//   const hour = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();
//   return `[${label}] ${level}: ${message} (${date.toDateString()} ${hour}:${minutes}:${seconds} }) `;
// });

// const logger = createLogger({
//   level: 'info',
//   format: combine(label({ label: 'LWC' }), timestamp(), myFormat),
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'successes',
//         'UM-%DATE%-success.log'
//       ),
//       datePattern: 'YYYY-DD-MM-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// });

// const errorlogger = createLogger({
//   level: 'error',
//   format: combine(label({ label: 'LWC' }), timestamp(), myFormat),
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'errors',
//         'UM-%DATE%-error.log'
//       ),
//       datePattern: 'YYYY-DD-MM-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// });

// export { logger, errorlogger };
