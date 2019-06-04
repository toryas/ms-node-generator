import log4js from "log4js";

/**
 *
 * @param {String} loggerName nombre con el que el logger registraran
 * @returns log4js.Logger
 */
export function getLogger(loggerName) {
  log4js.configure({
    appenders: { out: { type: "stdout" } },
    categories: { default: { appenders: ["out"], level: "trace" } }
  });
  return log4js.getLogger(loggerName);
}
