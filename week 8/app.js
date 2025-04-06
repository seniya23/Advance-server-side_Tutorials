const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Celebrity = require('./models/celebrity');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/celebrities', (req, res) => {
  const celebrities = Celebrity.getAllCelebrities();
  res.json(celebrities);
});

app.get('/search', (req, res) => {
  const name = req.query.name;
  const celebrityData = Celebrity.getCelebrityByName(name);
  if (celebrityData) {
    res.json(celebrityData);
  } else {
    res.status(404).json({ error: 'Celebrity not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});