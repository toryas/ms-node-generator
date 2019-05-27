const pathBase = "ms/";

module.exports = function(plop) {
  // Helpers

  plop.addHelper("upperCase", text => text.toUpperCase());

  // create your generators here

  plop.setGenerator("ms", {
    description: "Generate core microservice",
    prompts: [
      {
        type: "input",
        name: "artifactName",
        message: "Enter microservice name"
      },
      {
        type: "input",
        name: "description",
        message: "Enter microservice description"
      },
      {
        type: "input",
        name: "author",
        message: "Enter author name"
      }
    ],

    actions: data => {
      let actions = [
        function customAction(answers) {
          // move the current working directory to the plop file path
          // this allows this action to work even when the generator is
          // executed from inside a subdirectory
          process.chdir(plop.getPlopfilePath());

          // custom function can be synchronous or async (by returning a promise)
          var fs = require("fs-extra");

          let source = "templates/base-proyect/";
          let dest = pathBase;

          const filterFunc = function(n) {
            if (fs.lstatSync(n).isDirectory()) {
              return true;
            }
            let result = new RegExp(".template$").test(n);
            console.log(!result ? "copied" : "skipped", n);
            return !result;
          };

          fs.removeSync(dest);
          fs.copySync(source, dest, { filter: filterFunc });
        },
        {
          type: "add",
          path: pathBase + "package.json",
          templateFile: "templates/base-proyect/package.json.template"
        },
        {
          type: "add",
          path: pathBase + "sonar-project.properties",
          templateFile:
            "templates/base-proyect/sonar-project.properties.template"
        },
        {
          type: "add",
          path: pathBase + "README.md",
          templateFile: "templates/base-proyect/README.md.template"
        }
      ];

      // Return the array of actions to take.
      return actions;
    }
  });

  plop.setGenerator("module", {
    description: "Generate module microservice",
    prompts: [
      {
        type: "input",
        name: "moduleName",
        message: "Enter module name"
      }
    ],
    actions: data => {
      let actions = [
        {
          type: "add",
          path: pathBase + "src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.router.js",
          templateFile: "templates/module/module.router.js.template"
        },
        {
          type: "add",
          path: pathBase + "src/modules/{{kebabCase moduleName}}/controllers/{{kebabCase moduleName}}.controller.js",
          templateFile: "templates/module/controllers/module.controller.js.template"
        }
      ];
      return actions;
    }
  });
};
