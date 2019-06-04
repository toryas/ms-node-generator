import * as express from "express";
import { getLogger } from "../../core/util/logger.util";

import {{pascalCase moduleName}}Controller from "./controllers/{{kebabCase moduleName}}.controller"

const logger = getLogger("{{pascalCase moduleName}}Router");

export default class {{pascalCase moduleName}}Router {
 constructor() {
    logger.trace("Instanciando {{pascalCase moduleName}}Router");
    this.route = express.Router();
    this.example(this.route);

    return this.route;
  }

  /**
   * example route method
   * @param {express.Router} route
   */
  example(route) {
    route.get("/example", (req, res) => {
        logger.info("logger de metodo de ejemplo");
        res.status(200).send("Mensaje de ejemplo");
    });
  }

}
