const fs = require('fs');

const getJsonFromFile = (filePath, res) => {
  return fs.promises
    .readFile(filePath, { encoding: 'utf-8' })
    .then((file) => JSON.parse(file))
    .catch(() => res.status(500).send({ message: 'Requested resource not found' }));
};

module.exports = {
  getJsonFromFile,
};