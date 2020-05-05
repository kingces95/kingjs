var {
  ['@kingjs']: { 
    reflect: { is, defineProperty }
  }
} = require('./dependencies');

function createAccessor(target, x, y, z) {
  var name, descriptor;

  if (is.function(x)) {
    descriptor = { get: x };
    if (is.function(y))
      descriptor.set = y;
    name = descriptor.get.name || descriptor.set.name;
  }
  else if (is.stringOrSymbol(x) && !is.object(y)) {
    name = x;
    descriptor = { get: y };

    if (z)
      descriptor.set = z;
  }
  else {
    var { name, descriptor } = defineProperty.apply(this, null, x, y);
  }

  // accessors are enumerable default 
  if ('get' in descriptor || 'set' in descriptor) {
    if ('enumerable' in descriptor == false)
      descriptor.enumerable = true;
  }

  return { target, name, descriptor };
}

module.exports = createAccessor;
