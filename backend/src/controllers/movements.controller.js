const movementsService = require('../services/movements.service');
const { validateMovementInput } = require('../validators/movement.validator');

const listMovements = async (req, res, next) => {
  try {
    const movements = await movementsService.getMovementsByUser(req.user.id);
    return res.status(200).json(movements);
  } catch (error) {
    return next(error);
  }
};

const createEntry = async (req, res, next) => {
  try {
    const errorMessage = validateMovementInput(req.body);

    if (errorMessage) {
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const result = await movementsService.createMovement(req.user.id, {
      ...req.body,
      type: 'ENTRY',
    });

    return res.status(201).json({
      message: 'Entrada registrada com sucesso.',
      ...result,
    });
  } catch (error) {
    return next(error);
  }
};

const createExit = async (req, res, next) => {
  try {
    const errorMessage = validateMovementInput(req.body);

    if (errorMessage) {
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const result = await movementsService.createMovement(req.user.id, {
      ...req.body,
      type: 'EXIT',
    });

    return res.status(201).json({
      message: 'Saída registrada com sucesso.',
      ...result,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listMovements,
  createEntry,
  createExit,
};
