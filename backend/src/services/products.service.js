const prisma = require('../prisma/client');

const getProductsByUser = async (userId) => {
  return prisma.product.findMany({
    where: { userId },
    include: {
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getProductById = async (userId, productId) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
      userId,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    const error = new Error('Produto não encontrado.');
    error.statusCode = 404;
    throw error;
  }

  return product;
};

const createProduct = async (userId, payload) => {
  const existingSku = await prisma.product.findUnique({
    where: {
      userId_sku: {
        userId,
        sku: String(payload.sku).trim(),
      },
    },
  });

  if (existingSku) {
    const error = new Error('Já existe um produto com este SKU para este usuário.');
    error.statusCode = 409;
    throw error;
  }

  const categoryId = payload.categoryId ? Number(payload.categoryId) : null;

  if (categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      const error = new Error('Categoria inválida para o usuário atual.');
      error.statusCode = 400;
      throw error;
    }
  }

  return prisma.product.create({
    data: {
      name: String(payload.name).trim(),
      sku: String(payload.sku).trim(),
      description: payload.description ? String(payload.description).trim() : '',
      categoryId,
      purchasePrice: Number(payload.purchasePrice),
      salePrice: Number(payload.salePrice),
      quantity: Number(payload.quantity),
      minimumStock: Number(payload.minimumStock),
      userId,
    },
    include: {
      category: true,
    },
  });
};

const updateProduct = async (userId, productId, payload) => {
  const existingProduct = await getProductById(userId, productId);

  if (payload.sku && payload.sku !== existingProduct.sku) {
    const duplicateSku = await prisma.product.findUnique({
      where: {
        userId_sku: {
          userId,
          sku: String(payload.sku).trim(),
        },
      },
    });

    if (duplicateSku) {
      const error = new Error('Já existe um produto com este SKU para este usuário.');
      error.statusCode = 409;
      throw error;
    }
  }

  const categoryId = payload.categoryId !== undefined ? Number(payload.categoryId) : existingProduct.categoryId;

  if (categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      const error = new Error('Categoria inválida para o usuário atual.');
      error.statusCode = 400;
      throw error;
    }
  }

  return prisma.product.update({
    where: { id: Number(productId) },
    data: {
      name: payload.name ? String(payload.name).trim() : existingProduct.name,
      sku: payload.sku ? String(payload.sku).trim() : existingProduct.sku,
      description: payload.description !== undefined ? String(payload.description).trim() : existingProduct.description,
      categoryId: categoryId || null,
      purchasePrice: payload.purchasePrice !== undefined ? Number(payload.purchasePrice) : existingProduct.purchasePrice,
      salePrice: payload.salePrice !== undefined ? Number(payload.salePrice) : existingProduct.salePrice,
      quantity: payload.quantity !== undefined ? Number(payload.quantity) : existingProduct.quantity,
      minimumStock: payload.minimumStock !== undefined ? Number(payload.minimumStock) : existingProduct.minimumStock,
    },
    include: {
      category: true,
    },
  });
};

const deleteProduct = async (userId, productId) => {
  await getProductById(userId, productId);

  await prisma.product.delete({
    where: { id: Number(productId) },
  });

  return true;
};

module.exports = {
  getProductsByUser,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
