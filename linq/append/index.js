var { 
  ['@kingjs']: {
    IEnumerable,
    reflect: { exportExtension },
    linq: { Concat },
  }
} = require('./dependencies');

function append(value) {    
  return this[Concat]([ value ]);
};

exportExtension(module, IEnumerable, append);