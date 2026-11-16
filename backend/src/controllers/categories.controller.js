const categoriesService = require('../services/categories.service');
const { validateCategoryInput } = require('../validators/category.validator');

const listCategories = async (req, res, next) => {
  try {
    const categories = await categoriesService.getCategoriesByUser(req.user.id);
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const errorMessage = validateCategoryInput(req.body);

    if (errorMessage) {
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const category = await categoriesService.createCategory(req.user.id, req.body);
    return res.status(201).json({
      message: 'Categoria cadastrada com sucesso.',
      category,
    });
  } catch (error) {
    return next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const errorMessage = validateCategoryInput(req.body);

    if (errorMessage) {
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const category = await categoriesService.updateCategory(req.user.id, req.params.id, req.body);
    return res.status(200).json({
      message: 'Categoria atualizada com sucesso.',
      category,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await categoriesService.deleteCategory(req.user.id, req.params.id);
    return res.status(200).json({
      message: 'Categoria excluída com sucesso.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
