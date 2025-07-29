const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const data = await authService.registerUser(req.body);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
};
