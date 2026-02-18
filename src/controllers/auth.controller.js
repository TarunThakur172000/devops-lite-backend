const {
  registerUser,
  loginUser,
  deleteAccount,
  changePassword,
  recoverPassword
} = require('../services/auth.services');

const register = async (req, res, next) => {
  try {
    const userData = await registerUser(req.body);
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: userData
    });
  } catch (err) {
    next(err); // Pass to global error handler
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const jwtToken = await loginUser(email, password);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token: jwtToken
    });
  } catch (err) {
    next(err); // Could be invalid credentials → handled by service
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await deleteAccount(req.userId);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

const authme = (req, res) => {
  res.status(200).json({ status: "success", message: "Authorized" });
};

const passwordChange = async (req, res, next) => {
  try {
    await changePassword(req.userId, req.body);
    res.status(200).json({ status: "success", message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};

const passwordRecovery = async (req, res, next) => {
  try {
    const updatedData = await recoverPassword(req.body);
    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
      data: updatedData
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  deleteUser,
  authme,
  passwordChange,
  passwordRecovery
};
