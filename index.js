const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const index = require('./routes/index');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('port', PORT);

app.use(cors());
app.use('/api', index);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
