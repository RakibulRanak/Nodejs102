'use strict';
// Imports
const express = require('express');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes')
const globalErrorHandler = require('./error/errorHandler');
const AppError = require('./error/appError');
//const association = require('./association/association');

// Creating the express app
const app = express();

// Parsing JSON and Cookies
app.use(express.json({ limit: '1000kb' }));


app.use(morgan('dev'));

app.use('/api/v1/stories', storyRoutes);

app.get('/api/v1', (req, res) => {
  res.send('Welcome to home page!');
});

app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler)

// Exporting the app
module.exports = app;
