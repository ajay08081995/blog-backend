const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

const registerUser = async (userData) => {
  const existingUser = await authRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('Account already exists. Try a different email.');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await authRepository.createUser({ ...userData, password: hashedPassword });
  const { password, ...userWithoutPassword } = newUser._doc;

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

  return { user: userWithoutPassword, token };
};

const loginUser = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const { password: _, ...userWithoutPassword } = user._doc;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

  return { user: userWithoutPassword, token };
};

module.exports = {
  registerUser,
  loginUser,
};
