// This will be the node Express server that will serve up your app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3030;
const path = require('path');
// these are some of the libraries you will need

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

let results = [];

app.get('/results', (req, res) => {
  res.json(results);
});

app.post('/save-result', (req, res) => {
  const { name, time } = req.body;
  results.push({ name, time });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
