const ora = require('ora')
const gitClone = require('../utils/gitclone')

module.exports = async (args) => {
  const spinner = ora().start()
  
  try {
    const name = args._[1] || '';
    if(name.length) {
        console.log(`TDP > Creating and Amazing App: ${name}:`)
        const gc = await gitClone(name);
        if (gc) {
            console.log(gc);
            spinner.stop();
        }
    }
    spinner.stop()

    console.log(` TDP > ${name} has been Created!!! :P`)
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}
