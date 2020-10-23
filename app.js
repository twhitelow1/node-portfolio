// Require Express and initiate app
const express = require("express");
const app = express();
const PORT = 3000
const path = require('path');

// Set up Pug
app.set('view engine', 'pug');

// Set up static files
app.use(express.static('public'));

// Get Projects Data
const fs = require('fs');
let projects = {};
fs.readFile('data.json', (err, data) => {
  if (err) throw err;
  projects = JSON.parse(data);
  console.log(projects);
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/projects/:id', (req, res) => {
  res.render('project', { title: 'Project' });
});

app.listen(PORT, () => {
  console.log(`Server started and app listening at http://localhost:${PORT}`);
});
