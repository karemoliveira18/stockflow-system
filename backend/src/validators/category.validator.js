const validateCategoryInput = ({ name }) => {
  if (!name || !String(name).trim()) {
    return 'Nome da categoria é obrigatório.';
  }

  return null;
};

module.exports = {
  validateCategoryInput,
};
