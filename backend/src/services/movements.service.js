const prisma = require('../prisma/client');

const getMovementsByUser = async (userId) => {
  return prisma.stockMovement.findMany({
    where: { userId },
    include: {
      product: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const createMovement = async (userId, payload) => {
  const { productId, quantity, type } = payload;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
      userId,
    },
  });

  if (!product) {
    const error = new Error('Produto não encontrado para este usuário.');
    error.statusCode = 404;
    throw error;
  }

  if (type === 'EXIT' && Number(quantity) > product.quantity) {
    const error = new Error('Operação não permitida: quantidade solicitada superior ao estoque disponível.');
    error.statusCode = 400;
    throw error;
  }

  const delta = type === 'ENTRY' ? Number(quantity) : Number(quantity) * -1;

  return prisma.$transaction(async (tx) => {
    const updatedProduct = await tx.product.update({
      where: { id: product.id },
      data: {
        quantity: product.quantity + delta,
      },
    });

    const movement = await tx.stockMovement.create({
      data: {
        productId: product.id,
        userId,
        type,
        quantity: Number(quantity),
      },
      include: {
        product: true,
      },
    });

    return {
      movement,
      product: updatedProduct,
    };
  });
};

module.exports = {
  getMovementsByUser,
  createMovement,
};
