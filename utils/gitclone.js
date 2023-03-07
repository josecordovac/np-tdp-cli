var nodegit = require('nodegit'),
    path = require('path');

module.exports = async (name) => {

  var url = "https://github.com/android-sos/react-everis-simple-todo.git",
    local = `./${name}`,
    cloneOpts = {};

  const results = await nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
  }).catch(function (err) {
    console.log(err);
  });

  return results;
}
