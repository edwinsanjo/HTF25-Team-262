const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function login(req, res) {
  try {
    const { registerNumber, password } = req.body || {};
    if (!registerNumber || !password) {
      return res.status(400).json({ message: 'registerNumber and password required' });
    }

    const user = await User.findOne({ registerNumber });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { id: user._id.toString(), registerNumber: user.registerNumber, isAdmin: user.isAdmin };
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    const token = jwt.sign(payload, secret, { expiresIn: '2d' });
    res.json({ token, user: payload });
  } catch (e) {
    res.status(500).json({ message: 'Login failed' });
  }
}

async function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = { login, me };
