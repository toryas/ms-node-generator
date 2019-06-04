
module.exports = function(plop) {
  // Helpers

  plop.addHelper("upperCase", text => text.toUpperCase());

  // create your generators here

  plop.setGenerator("ms", {
    description: "Proyecto base para microservicios BancoEstado",
    prompts: [
      {
        type: "input",
        name: "artifactName",
        message: "Ingrese el nombre del Microservicio"
      },
      {
        type: "input",
        name: "description",
        message: "Ingrese descrpcion del Microservicio"
      },
      {
        type: "input",
        name: "author",
        message: "Ingrese nombre del autor"
      }
    ],

    actions: data => {
      const coreFiles = [
        "templates/base-proyect/.babelrc",
        "templates/base-proyect/.gitignore",
        "templates/base-proyect/jest.config.js",
        "templates/base-proyect/Makefile",
        "templates/base-proyect/package.json",
        "templates/base-proyect/README.md",
        "templates/base-proyect/sonar-project.properties",
        "templates/base-proyect/src/config/general.config.js",
        "templates/base-proyect/src/core/domain/response.js",
        "templates/base-proyect/src/core/middleware/error.middleware.js",
        "templates/base-proyect/src/core/server/index.js",
        "templates/base-proyect/src/core/server/router.js",
        "templates/base-proyect/src/core/util/config-validator.util.js",
        "templates/base-proyect/src/core/util/logger.util.js"

      ];
      let actions = [
        {
          type: "addMany",
          destination: "{{kebabCase artifactName}}",
          base: "templates/base-proyect",
          templateFiles: coreFiles
        }
      ];

      // Return the array of actions to take.
      return actions;
    }
  });

  plop.setGenerator("module", {
    description: "Genera modulo de microservicio",
    prompts: [
      {
        type: "input",
        name: "moduleName",
        message: "Introduzca nombre del modulo"
      }
    ],
    actions: data => {
      
      function validate(){
        let fs = require('fs');
        let existRouter = fs.existsSync("src/core/server/router.js");
        if(existRouter){
          let actions = [
            {
              type: "add",
              path: "src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.router.js",
              templateFile: "templates/module/module.router.js"
            },
            {
              type: "add",
              path: "src/modules/{{kebabCase moduleName}}/controllers/{{kebabCase moduleName}}.controller.js",
              templateFile: "templates/module/controllers/module.controller.js"
            },
            {
              type: "modify",
              path: "src/core/server/router.js",
              pattern: /(loadModules\(route\){)/gi,
              template: "$1\r\n\t\troute.use('/{{kebabCase moduleName}}',new {{pascalCase moduleName}}Router());"
            },
            {
              type: "modify",
              path: "src/core/server/router.js",
              pattern: /(\/\/-->Import Routers Here:)/gi,
              template: '$1\r\nimport {{pascalCase moduleName}}Router from "../../modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.router";'
            }
          ];
          return actions;
        }else{
          console.log("No se encuentra router del servidor");
          return []
        }
      }
      return validate();
    }
  });
};
