const minimist = require('minimist')
const error = require('./utils/error')

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  var urlWebapp = "https://github.com/android-sos/react-everis-simple-todo.git",
    urlMicroservice = "http://devops-gns.eastus2.cloudapp.azure.com:10080/genesis-backend/cli-tdp-ms-generic.git";

  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'microservice':
      require('./cmds/microservice')(args)
      break

    case 'webapp':
      require('./cmds/webapp')(args)
      break

    case 'mock':
      require('./cmds/mock')(args)
      break

    case 'version':
      require('./cmds/version')(args)
      break

    case 'help':
      require('./cmds/help')(args)
      break

    default:
      error(`"${cmd}" is not a valid command!`, true)
      break
  }
}
