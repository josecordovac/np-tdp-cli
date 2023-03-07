const replace = require('replace-in-file');

module.exports = (file, find, word)  => {
  const options = {
    files: file,
    from: find,
    to: word,
  };

  const results = replace.sync(options);
};
