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

app.get('/test-error', (req, res, next) => {
  const err = new Error('Something went wrong on the server!');
  err.status = 500;
  next(err);
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { projects: projects.projects });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.projects.find(({ id }) => id === +projectId);
  if (project) {
    res.render('project', { title: 'Project', project });
  }
});

// Error Handlers

// 404 handler to catch undefined or non-existent route requests
app.use((req, res, next) => {
  console.log('404 error handler called');
  const err = new Error('Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable');
  err.status = 404;
  next(err);
});


// Global error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status === 404) {
    console.log(`message: ${err.message}`);
    console.log(err.status);
    console.log(err.stack);
    res.render('page-not-found');
  } else {
    err.status = 500;
    err.message = 'Something went wrong on our end, we are working on fixing that for you.'
    res.render('error');
  }
});

app.listen(PORT, () => {
  console.log(`Server started and app listening at http://localhost:${PORT}`);
});
