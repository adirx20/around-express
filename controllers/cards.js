const { getJsonFromFile } = require('../helpers/files');
const path = require('path');

const cardsFilePath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = async (req, res) => {
    const users = await getJsonFromFile(cardsFilePath);
  
    res.send(users);
  }

  module.exports = {
      getCards
  }