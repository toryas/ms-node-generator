#!/usr/bin/env node

'use strict';

const nodePlop = require('node-plop');
const plop = nodePlop(__dirname + `/plopfile.js`, { destBasePath: process.cwd() });

async function run() {
  let args = process.argv.slice(2);

  if (args.length < 2) {

    console.log("Parametros no encontrados");
  } else {
    let action = args[0];

    switch (action) {
      case 'new':
        createMicroservice();
        break;

      case 'g':
        createModule();
        break;
    }

  }


}

/**
 * Crea base de un microservicio
 */
async function createMicroservice() {
  let msGen = plop.getGenerator('ms');
  try {
    let data = await msGen.runPrompts();
    let result = await msGen.runActions(data);

    let changes = result.changes;
    let fails = result.failures;
    console.log(fails);
    console.log(changes);

  } catch (error) {
    console.log(error);
  }
}

/**
 * Crea modulo de un microservicio
 */
async function createModule() {
  let msGen = plop.getGenerator('module');
  try {
    let data = await msGen.runPrompts();
    let result = await msGen.runActions(data);

    let changes = result.changes;
    let fails = result.failures;
    console.log(fails);
    console.log(changes);

  } catch (error) {
    console.log(error);
  }
}

run();