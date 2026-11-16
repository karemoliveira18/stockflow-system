const authService = require('../services/auth.service');
const { validateRegisterInput, validateLoginInput } = require('../validators/auth.validator');

const register = async (req, res, next) => {
  try {
    const errorMessage = validateRegisterInput(req.body);

    if (errorMessage) {
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const result = await authService.registerUser(req.body);
    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      ...result,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errorMessage = validateLoginInput(req.body);

    if (errorMessage) {
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const result = await authService.loginUser(req.body);
    return res.status(200).json({
      message: 'Login realizado com sucesso.',
      ...result,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
};
