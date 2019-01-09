'use strict';

function forEach(target, values) {

  // strings
  for (var name in values)
    this(target, name, values[name]);

  // symbols
  for (var symbol of Object.getOwnPropertySymbols(values))
    this(target, symbol, values[symbol]);

  return target;
}

module.exports = forEach;
