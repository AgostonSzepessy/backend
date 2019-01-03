import winston from 'winston';

export const logger = winston.createLogger({
    level: process.env.LOGGING_LEVEL,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: [new winston.transports.Console()],
});
