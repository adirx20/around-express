const path = require('path');
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

// const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });

    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(`${req.body.name} Got request body`);

  try {
    const newUser = await User.create({ name: name, about: about, avatar: avatar });

    res.send(newUser);
  } catch (error) {
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};