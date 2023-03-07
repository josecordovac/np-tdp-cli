const chalk = require("chalk");
const figlet = require("figlet");
const package = require("../package");

const menus = {
  main: `
    TDP Accelator - Team Genesis.
    tdp [command] <options>

    
    flow .................... Add new FLow.
    help .................... show help menu for a command.
    microservice <<NEW!>>.... Creación de un microservicio.
    mock .................... Star de Mock Server.
    module .................. Add new Module.
    pwa ..................... login > drawer (Angular 7, Ionic 4 - Stencil 0.18).
    version ................. show package version.
    webapp .................. login > (Angular 7 - Stencil 0.18 ).
    
  
    `,

  webapp: `
    tdp webapp <options>

    --name, -n ..... name of the app`,

  mock: `
    tdp mock <options>

    --start, ..... Start the server
    --show, ..... show all apies, and its active errorCode`,

  module: `
    tdp module <options>

    --name, -n ..... name of module`,

  microservice: `
    tdp microservice`,

  flow: `
    tdp flow <options>

    --name, -n ..... the flow name`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]


  console.log(
    chalk.hex('#5bc500').bold(
      figlet.textSync("TDP - CLI")
    )
  );

  console.log(
    chalk.hex('#954897').bold(package.version)
  );


  console.log(
    chalk.hex('#00A9E0').bold(
      menus[subCmd] || menus.main
    )
  )
}
