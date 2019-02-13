var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    Dictionary,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

function toLookup(keySelector, valueSelector) {       
  var lookup = new Dictionary();
  
  var enumerator = this[GetEnumerator]();  
  while (enumerator[MoveNext]()) {
    var current = enumerator[Current];
    
    var value = current;
    if (valueSelector)
      value = valueSelector(current);
    
    var key = keySelector(current);
    var values = lookup[key];
    if (!values) {
      var values = [];
      lookup[key] = values;
      values.key = key;
    }
    
    values.push(value);
  }
  
  return lookup;
};

exportExtension(module, IEnumerable, toLookup);
