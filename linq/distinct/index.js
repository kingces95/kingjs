var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    linq: {
      Except
    },
    IEnumerable,
  }
} = require('./dependencies');

function distinct(selectId) {
  return this[Except](undefined, selectId);
};

exportExtension(module, IEnumerable, distinct);
