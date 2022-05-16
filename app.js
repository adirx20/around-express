const express = require('express');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(helmet());

app.get('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(usersRouter);

app.use(cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
