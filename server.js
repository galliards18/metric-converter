'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');

const app = express();

// Root route — this handles GET /
app.get('/', (req, res) => {
  res.send('Metric Converter API is running');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

apiRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


module.exports = app; // for testing



// Other routes (e.g., /api/convert) go here...


