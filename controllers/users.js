/* eslint-disable indent */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AppError } = require('../errors/AppError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new AppError(404, 'No user found with that ID');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });

    if (!user) {
      throw new AppError(404, 'User ID not found');
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
    // if (error.name === 'CastError') {
    //   res.status(400).send({ message: 'Invalid input' });
    // } else {
    //   res.status(500).send({ message: 'Something is not working...' });
    // }
  }
};

// NEW CREATE USER FUNCTION
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      res
        .status(201)
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' || err.code === 11000) {
        throw new AppError(409, 'Email already exist');
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-string',
        { expiresIn: '7d' },
      );

      if (!user) {
        throw new AppError(401, 'Wrong email / password');
      }

      res.status(200).send({ user, token, message: 'successful' }); // need to edit the message
    })
    .catch((err) => {
      console.log('login error: ', err);
      next(err);
    });
};

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new AppError(404, 'User ID not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    next(error);
  }
};

const updateProfileAvatar = async (req, res, next) => {
  const { avatar } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new AppError(404, 'User ID not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
};
