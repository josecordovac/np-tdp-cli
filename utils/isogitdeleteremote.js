const fs = require('fs');
const isogit = require('isomorphic-git');

module.exports = async (pathRepository) => {
  isogit.plugins.set('fs', fs);

  return await isogit.deleteRemote({
    dir: pathRepository,
    remote: 'origin'
  })
  .then(() => {
    return true;
  })
  .catch(err => {
    console.log(err);
    return false;
  });
}
