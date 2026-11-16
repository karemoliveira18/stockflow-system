const validateRegisterInput = ({ name, email, password }) => {
  if (!name || !String(name).trim()) {
    return 'Nome é obrigatório.';
  }

  if (!email || !String(email).trim()) {
    return 'E-mail é obrigatório.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(email))) {
    return 'Informe um e-mail válido.';
  }

  if (!password || String(password).length < 6) {
    return 'A senha deve conter pelo menos 6 caracteres.';
  }

  return null;
};

const validateLoginInput = ({ email, password }) => {
  if (!email || !String(email).trim()) {
    return 'E-mail é obrigatório.';
  }

  if (!password || !String(password).trim()) {
    return 'Senha é obrigatória.';
  }

  return null;
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
