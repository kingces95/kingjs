'use strict';

var {
  ['@kingjs']: { 
    string: { expand }
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
  var lines = [];
  var i = 0;
  for (var key of keys) {
    var line = expand.call(template, { 
      ...descriptor, i: i++, key, value: source[key] 
    });
    lines.push(line);
  }

  return `${prefix}${lines.join(separator)}${suffix}`;
}

module.exports = printJoin;