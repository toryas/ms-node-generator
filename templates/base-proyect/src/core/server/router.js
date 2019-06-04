import * as express from "express";
import { getLogger } from "log4js";

import pkgjson from "../../../package.json";

const logger = getLogger("Router");

export default class Router {
  constructor() {
    logger.info("Instanciando Router");
    this.route = express.Router();
    this.version(this.route);

    return this.route;
  }

  /**
   * Entrega la version del artefacto
   * @param {express.Router} route
   */
  version(route) {
    route.get("/version", (req, res) => {
      logger.info(req.route);
      res.status(200).json(pkgjson.version);
    });
  }
  
}
