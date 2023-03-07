const fs = require('fs');
const isogit = require('isomorphic-git');

module.exports = async (pathRepository, urlRepository, usuario, clave) => {
  isogit.plugins.set('fs', fs);

  return await isogit.clone({
    dir: pathRepository,
    url: urlRepository,
    ref: 'master',
    authUsername: usuario,
    authPassword: clave
  })
  .then(() => {
    return true;
  })
  .catch(err => {
    console.log(err);
    return false;
  });
}
