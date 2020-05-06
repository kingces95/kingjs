var { 
  '@kingjs': {
    IEnumerable,
    reflect: {
       exportExtension
    },
    linq: { 
      Aggregate 
    }
  }
} = module[require('@kingjs-module/dependencies')]();

var Aggregate = require('@kingjs/linq.aggregate');

/**
 * @description Creates an array from a `IEnumerable`.
 * 
 * @this any An `IEnumerable` from which to create an array.
 */
function toArray() {      
  return this[Aggregate]([], function(x) { 
    this.push(x); 
    return this; 
  });
};

exportExtension(module, IEnumerable, toArray);
