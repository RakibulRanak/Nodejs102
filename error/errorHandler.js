'use strict';

const AppError = require('./appError');


const sendError = (err, res) => {
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ message: err.message, status: err.status });
  } else {
    res.status(500).json({ status: 'error', message: 'Something went wrong!' });
  }
};



const errorHandler = (err, req, res, next) => {
  //console.log(err.name);
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;
  sendError(error, res);
 
};

module.exports = errorHandler;
