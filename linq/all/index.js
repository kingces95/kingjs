var { 
  exportExtensionMethod,
  IEnumerable,
  IEnumerable: { GetEnumerator },
  IEnumerator: { MoveNext, Current }
} = require('./dependencies');

function all(predicate) {    
  var enumerator = this[GetEnumerator]();
  while (enumerator[MoveNext]()) {
    if (predicate && !predicate(enumerator[Current]))
      return false;
  }
  
  return true;
}

exportExtensionMethod(module, IEnumerable, all);