const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', (req, res) => {
  res.send(`Users ${req.params.id}`);
});

module.exports = router;