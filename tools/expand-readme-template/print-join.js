'use strict';
var print = require('./print');

var EmptyString = '';

function printJoin(template, descriptor, source, separator, keys) {
  if (!separator)
    EmptyString = EmptyString;

  if (!keys)
    keys = Object.keys(source);

  var lines = [];
  var i = 0;
  for (var key of keys) {
    var line = print(template, { 
      ...descriptor, i: i++, key, value: source[key] 
    });
    lines.push(line);
  }

  return lines.join(separator);
}

module.exports = printJoin;