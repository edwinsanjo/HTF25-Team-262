const jwt = require('jsonwebtoken');

function auth(requiredAdmin = false) {
  return (req, res, next) => {
    const header = req.headers['authorization'] || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
      const payload = jwt.verify(token, secret);
      req.user = payload; // { id, registerNumber, isAdmin }
      if (requiredAdmin && !payload.isAdmin) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = { auth };
