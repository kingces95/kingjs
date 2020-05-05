var {
  ['@kingjs']: { odometer }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Generates a sequence of arrays or descriptors 
 * composed of a single element each from a set of arrays.
 * 
 * @param {*} namedArrays 
 */
function* fromEach(namedArrays) {
  var species = typeof namedArrays == 'array' ? Array : Object;

  var names = [ ];
  if (species == Object) {
    for (var name in namedArrays)
      names.push(name);
  }
  else {
    for (var i = 0; i < namedArrays.length; i ++)
      names.push(i);
  }

  var lengths = names.map(name => namedArrays[name].length || 1);

  for (var indices of odometer(lengths)) {
    var result = new species();

    for (var i = 0; i < names.length; i ++) {
      var name = names[i];
      result[name] = namedArrays[name][indices[i]];
    }

    yield result;
  }
}

module.exports = fromEach;