const prisma = require('../prisma/client');

const getCategoriesByUser = async (userId) => {
  return prisma.category.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  });
};

const createCategory = async (userId, payload) => {
  const name = String(payload.name).trim();

  const existingCategory = await prisma.category.findFirst({
    where: {
      userId,
      name,
    },
  });

  if (existingCategory) {
    const error = new Error('Categoria já cadastrada para este usuário.');
    error.statusCode = 409;
    throw error;
  }

  return prisma.category.create({
    data: {
      name,
      userId,
    },
  });
};

const updateCategory = async (userId, categoryId, payload) => {
  const category = await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
      userId,
    },
  });

  if (!category) {
    const error = new Error('Categoria não encontrada.');
    error.statusCode = 404;
    throw error;
  }

  return prisma.category.update({
    where: { id: Number(categoryId) },
    data: {
      name: String(payload.name).trim(),
    },
  });
};

const deleteCategory = async (userId, categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
      userId,
    },
  });

  if (!category) {
    const error = new Error('Categoria não encontrada.');
    error.statusCode = 404;
    throw error;
  }

  const hasProducts = await prisma.product.findFirst({
    where: {
      categoryId: Number(categoryId),
      userId,
    },
  });

  if (hasProducts) {
    const error = new Error('Não é possível excluir uma categoria que está sendo usada por produtos.');
    error.statusCode = 400;
    throw error;
  }

  await prisma.category.delete({
    where: { id: Number(categoryId) },
  });

  return true;
};

module.exports = {
  getCategoriesByUser,
  createCategory,
  updateCategory,
  deleteCategory,
};
