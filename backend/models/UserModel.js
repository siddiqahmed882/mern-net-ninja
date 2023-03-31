const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * @desc Static method to register user
 * @param {string} email
 * @param {string} password
 */
userSchema.statics.register = async function (email, password) {
  // check if user exists
  const userExists = await this.findOne({ email });

  if (userExists) {
    throw Error('User already exists');
  }

  // generate salt
  const salt = await bcrypt.genSalt(10);

  // hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

/**
 *  @desc Static method to login user
 * @param {string} email
 * @param {string} password
 */
userSchema.statics.login = async function (email, password) {
  // check if user exists
  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect user credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Error('Incorrect user credentials');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
