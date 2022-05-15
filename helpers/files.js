const fs = require('fs');

const getJsonFromFile = (filePath) => fs.promises.readFile(filePath)
  .then((file) => JSON.parse(file))
  .catch((err) => console.log(err));

module.exports = {
  getJsonFromFile,
};