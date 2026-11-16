const test = require('node:test');
const assert = require('node:assert/strict');

const { validateRegisterInput } = require('../src/validators/auth.validator');
const { validateMovementInput } = require('../src/validators/movement.validator');

test('Validação de cadastro rejeita nome vazio', () => {
  const result = validateRegisterInput({ name: '', email: 'user@example.com', password: '123456' });
  assert.equal(result, 'Nome é obrigatório.');
});

test('Validação de cadastro aceita payload válido', () => {
  const result = validateRegisterInput({ name: 'Maria', email: 'maria@example.com', password: '123456' });
  assert.equal(result, null);
});

test('Validação de movimentação bloqueia quantidade zero', () => {
  const result = validateMovementInput({ productId: 1, quantity: 0, type: 'EXIT' });
  assert.equal(result, 'Quantidade da movimentação deve ser maior que zero.');
});

test('Validação de movimentação aceita movimento válido', () => {
  const result = validateMovementInput({ productId: 1, quantity: 4, type: 'EXIT' });
  assert.equal(result, null);
});
