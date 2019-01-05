var assert = require('assert');

var {
  '@kingjs/define-interface': defineInterface,
} = require('@kingjs/require-packages').call(module);

var ScopePrefix = '@';
var ScopeDelimiter = '/';
var Delimiter = '.';

function defineSymbols(scope, descriptor) {
  var symbolTable = { };
  var names = [ ];

  function walk(target, source) {

    for (var name in source) {
      var value = source[name];

      names.push(name);
      {
        var symbolName = ScopePrefix + scope + ScopeDelimiter + names.join(Delimiter);

        if (value === null)
          target[name] = symbolTable[name] = Symbol.for(symbolName);

        else if (typeof value == 'string')
          target[name] = symbolTable[value];

        else if (typeof value == 'object') {
          target[name] = defineInterface(symbolTable, name, {
            id: Symbol.for(symbolName),
            members: walk({ }, value.members),
            extends: walk([ ], value.extends)
          });
        }

        else if (typeof value == 'symbol')
          symbolTable[name] = target[name] = value;

        else
          assert.fail();
      }
      names.pop();
    }

    return target;
  }

  Scope = Symbol.for(ScopePrefix + scope);
  Symbol[Scope] = walk({ }, descriptor); 
  return Scope;
}

module.exports = defineSymbols;