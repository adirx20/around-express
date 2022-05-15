const { getJsonFromFile } = require('../helpers/files');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = async (req, res) => {
  const users = await getJsonFromFile(usersFilePath);

  res.send(users);
}

const getUserById = async (req, res) => {
  const users = await getJsonFromFile(usersFilePath);

  const user = users.find(user => user.id === req.params.user_id);

  if (!user) {
    req.status(404).send(user);
  } else {
    req.send(user);
  }
}

module.exports = {
  getUsers,
  getUserById
}