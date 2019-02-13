var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

function elementAt(index) {
  if (index < 0)
    throw "elementAt: index < 0"

  var enumerator = this[GetEnumerator]();
  
  var current = 0;

  while (enumerator[MoveNext]()) {
    if (current++ == index)
      return enumerator[Current];
  }

  throw "elementAt: sequence.count() => " + current + 
    " < index => " + index;
};

exportExtension(module, IEnumerable, elementAt);