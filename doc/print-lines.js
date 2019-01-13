'use strict';
var print = require('./print');

function printLines(template, descriptor, source, keys) {
  if (!keys)
    keys = Object.keys(source);

  var lines = [];
  for (var key of keys)
    lines.push(print(template, { ...descriptor, key, value: source[key] }));

  return lines.join('\n');
}

module.exports = printLines;