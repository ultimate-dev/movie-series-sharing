const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'].replace("Bearer","").trim() || req.body.token || req.query.token;
  if (token) {
    jwt.verify(token, req.app.get('secret_key'), (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      status: false,
      message: 'No token provided.'
    });
  }
};
