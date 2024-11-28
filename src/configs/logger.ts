import { createLogger, format, Logger, transports } from "winston";
import { deploymentMode } from "./environment";

const loggingLevel =
  deploymentMode?.toUpperCase() === "LOCAL" ? "debug" : "warn";
const options = {
  console: {
    level: loggingLevel,
    handleExceptions: true,
    json: false,
    colorize: true,
    name: "consoleLogger",
  },
};

<<<<<<< Updated upstream
const syslogOptions: SyslogTransportOptions = {
  level: loggingLevel,
  host: papertrailOptions.host,
  port: papertrailOptions.port,
  protocol: "udp4",
  localhost: "open-house-api",
  eol: "\n",
};

=======
>>>>>>> Stashed changes
export const logger: Logger = createLogger({
  level: loggingLevel,
  exitOnError: false,
  format: format.simple(),
  transports: [new transports.Console(options.console)],
});

logger.info(`Winston is configured and logging to the console`);
