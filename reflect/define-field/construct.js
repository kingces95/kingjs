function createField(target, name, value) {
  return { target, name, descriptor: { value } };
}

module.exports = createField;
