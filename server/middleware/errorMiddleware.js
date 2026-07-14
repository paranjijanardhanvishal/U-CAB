const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let errors = null;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Handle express-validator errors or custom errors passed as array
  if (err.errors && Array.isArray(err.errors)) {
    statusCode = 400;
    message = 'Validation failed';
    errors = err.errors;
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors: process.env.NODE_ENV === 'production' ? errors : (errors || err.stack),
  });
};

export { notFound, errorHandler };
