var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    IEnumerable,
  }
} = module[require('@kingjs-module/dependencies')]();

var EmptyArray = [];

/**
 * @description Returns an empty sequence.
 */
function empty() { return EmptyArray; }

module.exports = empty;