import winston from "winston";

export const Logger = winston.createLogger({
    transports: [
      new winston.transports.Console({ silent: process.env.NODE_ENV == "test" }),
      new winston.transports.File({ filename: "log/express.log" }),
    ],
  })