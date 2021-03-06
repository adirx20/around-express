const express = require('express');

const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:user_id', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateProfileAvatar);

module.exports = router;