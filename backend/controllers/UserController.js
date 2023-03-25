const User = require('../models/UserModel');
const mongoose = require('mongoose');

/**
 * @desc Login user
 * @param {Request} req
 * @param {Response} res
 */
async function login(req, res) {}

/**
 * @desc Register user
 * @param {Request} req
 * @param {Response} res
 */
async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    const user = await User.register(email, password);
    return res.status(200).json({ email, user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  login,
  register,
};
