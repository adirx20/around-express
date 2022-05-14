const express = require('express');
const router = express.Router();
const { getJsonFromFile } = require('../helpers/files');

router.get('/cards', async (req, res) => {
  const cards = await getJsonFromFile('./data/cards.json');
  res.send(cards);
});

module.exports = router;