import { createLogger, transports, format as winstonFormat } from "winston";

const logger = createLogger({
  level: "info",
  format: winstonFormat.combine(
    winstonFormat.timestamp({
      format: "dd/MM/YYYY HH:mm:ss",
    }),
    winstonFormat.printf(({ timestamp, level, message, meta }) => {
      return `${timestamp} [${level}]: ${message} ${
        meta ? JSON.stringify(meta) : ""
      }`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

export default logger;
