module.exports = {
  '*.(js|jsx)': ['prettier --write', 'eslint --fix'],
  '*.(ts|tsx)': [() => 'tsc --noEmit', 'prettier --write', 'eslint --fix'],
  '*.json': ['prettier --write'],
}
