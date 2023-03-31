const logRequest = (req, res, next) => {
  console.log('Time:', Date.now(), req.path);
  next();
};

module.exports = logRequest;
