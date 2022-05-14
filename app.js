const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.get('/', (req, res) => {
  res.send('User request: ');
});

app.use(usersRouter);

app.use(cardsRouter);

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
