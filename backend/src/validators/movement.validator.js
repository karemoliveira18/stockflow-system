const validateMovementInput = ({ productId, quantity, type }) => {
  if (!productId) {
    return 'Produto é obrigatório.';
  }

  if (!type || !['ENTRY', 'EXIT'].includes(type)) {
    return 'Tipo da movimentação deve ser ENTRY ou EXIT.';
  }

  if (quantity === undefined || Number(quantity) <= 0) {
    return 'Quantidade da movimentação deve ser maior que zero.';
  }

  return null;
};

module.exports = {
  validateMovementInput,
};
