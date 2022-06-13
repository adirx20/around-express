// const path = require('path');
const Card = require('../models/card');

// const cardsFilePath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

const createCard = async (req, res) => {
  console.log(req.body);
  const { name, link } = req.body;

  try {
    const owner = req.user._id;
    console.log(`name: ${name}\nlink: ${link}`);
    console.log('OWNER:', owner);

    const newCard = await Card.create({ name: name, link: link, owner: owner });
    res.status(201).send(newCard);

  } catch (error) {
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

const deleteCard = async (req, res) => {
  console.log(req.body);
  const cardId = req.params.card_id;

  try {

    const card = await Card.findOneAndRemove({ _id: cardId });

    if (!card) {
      res.status(404).send({ message: 'Card not found' });
    }
    res.status(200).send({ message: `${cardId} - This card has been deleted successfully` });

  } catch (error) {

    res.status(500).send({ message: 'Requested resource not found' });

  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};