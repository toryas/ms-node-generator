import { getLogger } from "../util/logger.util";

import Response from "../domain/response";

const logger = getLogger("ErrorMiddleware");

/**
 * Manejo de errores genericos
 * @param {object} app - Instancia del servidor.
 */
export function handleGenericErrors() {
  logger.info(
    "El manejador de errores ahora se registra para manejar todos los errores."
  );

  app.use(ErrorMiddleware.catchGenericError);
  app.use(ErrorMiddleware.catchNotFoundError);

  process.on("uncaughtException", ErrorMiddleware.catchUncaughtException);
}

/**
 * Captura de error genérico
 * @param {JSON} err - Error HTTP de la función de middleware, denominado "err" por convención.
 * @param {JSON} req - Solicitud HTTP a la función de middleware, denominado "req" por convención.
 * @param {JSON} res - Respuesta HTTP a la función de middleware, denominado "res" por convención.
 * @param {JSON} next - Devolución de llamada a la función de middleware, denominado "next" por convención.
 */
export function catchGenericError(err, req, res, next) {
  logger.error(`error en la ejecución de la operación (${err})`);

  let response = new Response(500, "99", "Error generico");

  res.status(response.statusCode).send(response.body);
}

/**
 * Captura de error por ruta no encontrada
 * @param {JSON} req - Solicitud HTTP a la función de middleware, denominado "req" por convención.
 * @param {JSON} res - Respuesta HTTP a la función de middleware, denominado "res" por convención.
 */
export function catchNotFoundError(req, res, next) {
  if (!req.route) {
    logger.error(`peticion a ruta no encontrada`);
    let response = new Response(404, "98", "Ruta no encontrada");
    res.status(response.statusCode).send(response.body);
  }
}
