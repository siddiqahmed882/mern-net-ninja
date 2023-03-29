const validator = require('validator');

const User = require('../models/UserModel');
const mongoose = require('mongoose');

const Token = require('../lib/Token');

/**
 * @desc Login user
 * @param {import('express').Request} req
 * @param {import('express').Request} res
 */
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    const user = await User.login(email, password);
    const token = Token.generateAccessToken({ _id: user._id });
    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

/**
 * @desc Register user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    });
  }

  if (email.toLowerCase().includes(password.toLowerCase())) {
    return res.status(400).json({ error: 'Your password must not match your email' });
  }

  try {
    const user = await User.register(email, password);
    const token = Token.generateAccessToken({ _id: user._id });
    return res.status(201).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  login,
  register,
};
