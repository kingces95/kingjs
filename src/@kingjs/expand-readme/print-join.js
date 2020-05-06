var {
  '@kingjs': { 
    stringEx: { Expand }
  }
} = module[require('@kingjs-module/dependencies')]();

var EmptyString = '';

function printJoin(
  template, 
  descriptor, 
  source, 
  separator = EmptyString, 
  prefix = EmptyString, 
  suffix = EmptyString) {

  if (!source)
    return EmptyString;

  var keys = Object.keys(source);
  if (!keys.length)
    return EmptyString;

  var lines = [];
  var i = 0;
  for (var key of keys) {
    var line = template[Expand]({ 
      ...descriptor, i: i++, key, value: source[key] 
    });
    lines.push(line);
  }

  return `${prefix}${lines.join(separator)}${suffix}`;
}

module.exports = printJoin;