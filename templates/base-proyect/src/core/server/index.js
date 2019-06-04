import express from "express";
import { getLogger } from "../util/logger.util";
import helmet from "helmet";

import pkj from "../../../package.json";
import { GENERAL_CONFIG } from "../../config/general.config";
import Router from "./router.js";
import {
  catchGenericError,
  catchNotFoundError
} from "../middleware/error.middleware.js";
import ConfigValidator from "../util/config-validator.util.js";

const logger = getLogger("Server");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

/**
 * Carga las rutas de las API a servidor
 * @param {express.Express} app
 */
function loadRouters(app) {
  let router = new Router();
  let basePath = buildBasePath();
  app.use(basePath, router);
  logger.info("Rutas cargadas con path base=", basePath);
}

/**
 * Inicia el servidor cargando sus configuraciones
 */
function starServer() {
  logger.info("> Iniciando ".concat(pkj.artifactType, " ", pkj.name));
  let app = express();
  logger.info("> Configurando servidor");
  configServer(app);
  logger.info("> Cargando Rutas");
  loadRouters(app);
  app.use(catchGenericError);
  app.use(catchNotFoundError);
  logger.info("> Configurando puerto ", GENERAL_CONFIG.PUERTO);
  app.listen(GENERAL_CONFIG.PUERTO);
  logger.info("> ".concat(pkj.artifactType, " ", pkj.name, " iniciado <"));
}

/**
 * Agrega configuraciones al servidor
 * @param {*} app
 */
function configServer(app) {
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

/**
 * Crea el path para la API del artefacto con el formato:
 * [tipo_artefacto]/v[version]/[nombre_artefacto]
 * @returns {string} path base.
 */
function buildBasePath() {
  let artifactType = pkj.artifactType;
  let version = pkj.version.split(".")[0];
  let name = pkj.name;

  let path = "/".concat(artifactType, "/v", version, "/", name);
  return path;
}

/**
 * Funcion main de arranque de servidor
 */
function main() {
  if (ConfigValidator.validateConfig(GENERAL_CONFIG)) {
    starServer();
  } else {
    logger.fatal(
      "No estan todas las variables configuradas para levantar el MicroServicio"
    );
    return;
  }
}

main();
