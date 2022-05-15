const path = require('path');
const { getJsonFromFile } = require('../helpers/files');

const cardsFilePath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = async (req, res) => {
  try {
    const cards = await getJsonFromFile(cardsFilePath);

    res.send(cards);
  } catch (error) {
    console.log('Error happened in getCards: ', error);
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

module.exports = {
  getCards,
};