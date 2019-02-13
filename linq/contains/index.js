var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    linq: {
      defaultEqual
    },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

function contains(value, equal) {
  var enumerator = this[GetEnumerator]();
  
  if (!equal)
    equal = defaultEqual;
  
  while (enumerator[MoveNext]()) {
    if (equal(value, enumerator[Current]))
      return true;
  }
  
  return false;
};

exportExtension(module, IEnumerable, contains);
