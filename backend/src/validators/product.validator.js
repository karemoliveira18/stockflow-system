const validateProductInput = ({ name, sku, purchasePrice, salePrice, quantity, minimumStock }) => {
  if (!name || !String(name).trim()) {
    return 'Nome do produto é obrigatório.';
  }

  if (!sku || !String(sku).trim()) {
    return 'SKU é obrigatório.';
  }

  if (purchasePrice === undefined || Number(purchasePrice) < 0) {
    return 'Preço de compra inválido.';
  }

  if (salePrice === undefined || Number(salePrice) < 0) {
    return 'Preço de venda inválido.';
  }

  if (quantity === undefined || Number(quantity) < 0) {
    return 'Quantidade disponível inválida.';
  }

  if (minimumStock === undefined || Number(minimumStock) < 0) {
    return 'Estoque mínimo inválido.';
  }

  return null;
};

module.exports = {
  validateProductInput,
};
