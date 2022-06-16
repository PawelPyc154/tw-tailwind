module.exports = {
  '*.(js|jsx)': ['prettier --write'],
  '*.(ts|tsx)': [() => 'tsc --noEmit', 'prettier --write'],
  '*.json': ['prettier --write'],
}
