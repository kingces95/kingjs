var {
  ['@kingjs']: { 
    stringEx: { Expand }
  }
} = require('./dependencies');

var EmptyString = '';

function printJoin(template, descriptor, source, separator, prefix, suffix) {
  if (!source)
    return EmptyString;

  if (!separator)
    separator = EmptyString;

  if (!prefix)
    prefix = EmptyString;

  if (!suffix)
    suffix = EmptyString;

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