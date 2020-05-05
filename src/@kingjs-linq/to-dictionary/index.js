var { 
  ['@kingjs']: {
    IEnumerable,
    Dictionary,
    linq: {
      Aggregate
    },
    reflect: { 
      exportExtension 
    },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Creates a dictionary from a sequence where the 
 * dictionary keys and values are projected from each element.
 * 
 * @param {*} keySelector 
 * @param {*} valueSelector 
 */
function toDictionary(keySelector, valueSelector) {      
  return this[Aggregate](new Dictionary(), function(x) { 
    var key = keySelector(x);
    if (key in x)
      throw "toDictionary: key already exists: " + key;
    
    var value = x;
    if (valueSelector)
      value = valueSelector(x);
    
    this[key] = value;
    return this;
  });
};

exportExtension(module, IEnumerable, toDictionary);
