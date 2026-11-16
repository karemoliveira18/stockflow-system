const productsService = require('../services/products.service');
const { validateProductInput } = require('../validators/product.validator');

const listProducts = async (req, res, next) => {
  try {
    const products = await productsService.getProductsByUser(req.user.id);
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await productsService.getProductById(req.user.id, req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const errorMessage = validateProductInput(req.body);

    if (errorMessage) {
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const product = await productsService.createProduct(req.user.id, req.body);
    return res.status(201).json({
      message: 'Produto cadastrado com sucesso.',
      product,
    });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const fields = req.body || {};
    const errorMessage = validateProductInput(fields);

    if (errorMessage) {
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const product = await productsService.updateProduct(req.user.id, req.params.id, fields);
    return res.status(200).json({
      message: 'Produto atualizado com sucesso.',
      product,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productsService.deleteProduct(req.user.id, req.params.id);
    return res.status(200).json({
      message: 'Produto excluído com sucesso.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
