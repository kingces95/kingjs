var { 
  ['@kingjs']: {
    IEnumerable,
    reflect: { exportExtension },
    linq: { Concat },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Generates an sequence identical to another 
 * sequence but with a value added to the end.
 */
function append(value) {    
  return this[Concat]([ value ]);
};

exportExtension(module, IEnumerable, append);