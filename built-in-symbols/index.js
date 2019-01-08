'use strict';
var builtInSymbols = { };

for (var name of Object.getOwnPropertyNames(Symbol)) {
  var value = Symbol[name];
  if (typeof value != 'symbol')
    continue;
  builtInSymbols[value] = name;
}

module.exports = builtInSymbols;