const PORT = process.env.PORT || 3000;
const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const apiRouter = require('./back-end/routers/api');
const {
  errorHandlerMiddleware,
} = require('./back-end/middlewares/errorHandler');

// DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((error) => console.log(error));

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json()); // parses requests as json

// Home Page - staticFile
app.use('/', express.static('./front-end/dist'));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}./front-end/dist/index.html`);
});

// Routers Use
app.use('/api', apiRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
