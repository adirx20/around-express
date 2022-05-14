const { getJsonFromFile } = require('../helpers/files');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = async (req, res) => {
  const users = await getJsonFromFile(usersFilePath); // stops here

  res.send(users);
}

module.exports = {
  getUsers,
}