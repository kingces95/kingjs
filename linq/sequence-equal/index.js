var { 
  ['@kingjs']: {
    linq: { defaultEqual },
    reflect: { exportExtension },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

function sequenceEqual(other, equals) {
  if (equals === undefined)
    equals = defaultEqual;
  
  var lhs = this[GetEnumerator]();  
  var rhs = other[GetEnumerator]();  
  
  while (lhs[MoveNext]()) {
    if (rhs[MoveNext]() == false)
      return false;
    
    var lhsValue = lhs[Current];
    var rhsValue = rhs[Current];
    
    if (!equals(lhsValue, rhsValue))
      return false;
  }
  
  return rhs[MoveNext]() == false;
}

exportExtension(module, IEnumerable, sequenceEqual);