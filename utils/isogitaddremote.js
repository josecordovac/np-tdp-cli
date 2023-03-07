const fs = require('fs');
const isogit = require('isomorphic-git');

module.exports = async (pathRepository,newurlremote) => {
  isogit.plugins.set('fs', fs);

  return await isogit.addRemote({
    dir: pathRepository,
    remote: 'origin',
    url: newurlremote
  })
  .then(() => {
    return true;
  })
  .catch(err => {
    console.log(err);
    return false;
  });
}
