'use strict';

var assert = require('assert');

var SymbolPrefix = '@kingjs/symbol';
var Delimiter = '.';

var symbol;

function createName(names) {
  return `${SymbolPrefix}.${names.join(Delimiter)}`;
}

function createSymbol(names) {
  return Symbol.for(createName(names));
}

function createInterface(source, names) {
  var name = createName(names);
  
  var result = function() { assert.fail(); }
  result.prototype = null;
  Object.defineProperty(result, 'name', { 
    enumerable: true,
    value: name,
  });
  result[symbol.identity] = createSymbol(names);

  for (var key in source)
    result[key] = source[key];

  return result;
}

function initialize() {
  symbol = this;

  function walk(names) {
    for (var name in this) {
      var value = this[name];

      names.push(name);
      {
        if (value === null)
          this[name] = createSymbol(names);
        else if (typeof value == 'string')
          this[name] = symbol[value];
        else if (typeof value == 'object')
          this[name] = createInterface(walk.call(value, names), names);
        else
          assert(typeof value == 'symbol');
      }
      names.pop();
    }

    return this;
  }

  return walk.call(this, []); 
}

module.exports = initialize;