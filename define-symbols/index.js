var assert = require('assert');

var {
  ['@kingjs']: { defineInterface },
} = require('./dependencies');

var ScopePrefix = '@';
var ScopeDelimiter = '/';
var Delimiter = '.';

function defineSymbols(target, name, descriptor) {
  var symbolTable = { };
  var names = [ ];

  function walk(target, source) {

    for (var key in source) {
      var value = source[key];

      names.push(key);
      {
        var symbolName = ScopePrefix + name + ScopeDelimiter + names.join(Delimiter);

        if (value === null)
          target[key] = symbolTable[key] = Symbol.for(symbolName);

        else if (typeof value == 'string')
          target[key] = symbolTable[value];

        else if (typeof value == 'function')
          target[key] = value;

        else if (typeof value == 'object') {
          var members = walk({ }, value.members);
          var extnds = walk([ ], value.extends);
          target[key] = defineInterface(symbolTable, key, {
            id: Symbol.for(symbolName),
            members,
            extends: extnds,
          });
        }

        else if (typeof value == 'symbol')
          symbolTable[key] = target[key] = value;

        else
          assert.fail();
      }
      names.pop();
    }

    return target;
  }

  return target[name] = walk({ }, descriptor); 
}

module.exports = defineSymbols;