function handleError(err,req, res, next){
  console.error(`[${new Date().toISOString()}] ${err.message}`);

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
}

module.exports = handleError;