'use strict';
// Imports
const express = require('express');
const morgan = require('morgan');
const association = require('./association/association');

// Creating the express app
const app = express();

// Parsing JSON and Cookies
app.use(express.json({ limit: '1000kb' }));


app.use(morgan('dev'));

app.get('/api/v1', (req, res) => {
  res.send('Hello');
});

app.all('*', (req, res, next) => {
    res.send(`Can't find ${req.originalUrl} on this server!`);
});

// Exporting the app
module.exports = app;
