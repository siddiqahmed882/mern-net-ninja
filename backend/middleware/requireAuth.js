const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const authorization = req.headers.authorization || req.headers.Authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken._id;
    next();
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = requireAuth;
