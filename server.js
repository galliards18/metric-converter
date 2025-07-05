'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

apiRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app; // for testing
