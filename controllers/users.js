const path = require('path');
const { getJsonFromFile } = require('../helpers/files');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath, res);

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath, res);

    const user = users.find((user) => user._id === req.params.user_id);

    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

module.exports = {
  getUsers,
  getUserById,
};