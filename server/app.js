'use strict';
// Imports
const express = require('express');
const cors = require('cors')

const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes')
const userRoutes = require('./routes/userRoutes')


const globalErrorHandler = require('./errors/errorHandler');
const AppError = require('./errors/appError');
const association = require('./associations/association');

// Creating the express app
const app = express();
app.use(cors())
app.use(cookieParser())
// Parsing JSON and Cookies

app.use(express.json({ limit: '1000kb' }));


app.use(morgan('dev'));

app.use('/api/v1/stories', storyRoutes);
app.use('/api/v1/users', userRoutes);


app.get('/api/v1', (req, res) => {
  res.send('Welcome to home page!');
});

app.all('*', (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler)

// Exporting the app
module.exports = app;
