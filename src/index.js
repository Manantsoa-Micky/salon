const express = require('express');
const mongoose = require('mongoose');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});
