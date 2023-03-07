
const { replace } = require('replace-in-file');

module.exports = (file, find, word)  => {
  const options = {
    files: file,
    from: /1.0.3/g,
    to: word,
  };
  
    replace(options)
      .then(results => {
        console.log('Replacement results:', results);
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
}; 


