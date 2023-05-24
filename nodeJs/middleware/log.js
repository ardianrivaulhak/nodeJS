const logRequest = (req, res, next) => {
  const method = req.method;
  const path = req.path;
  console.log('Time:', Date.now(), `${method}${path}`);
  next();
};

module.exports = logRequest;
