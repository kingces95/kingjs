var assert = require('assert');

var {
  '@kingjs/define-interface': defineInterface,
} = require('@kingjs/require-packages').call(module);

var Delimiter = '.';

function defineSymbols(target, prefix, descriptor) {
  var symbolTable = { };
  var names = [ ];

  function walk(target, descriptor) {

    for (var name in descriptor) {
      var value = descriptor[name];

      names.push(name);
      {
        var fullName = names.join(Delimiter);
        var symbolName = prefix + fullName;

        if (value === null)
          target[name] = symbolTable[fullName] = Symbol.for(symbolName);

        else if (typeof value == 'string')
          target[name] = symbolTable[value];

        else if (typeof value == 'object') {
          target[name] = defineInterface(symbolTable, fullName, {
            id: Symbol.for(symbolName),
            members: walk({ }, value.members),
            extends: walk([ ], value.extends)
          });
        }

        else if (typeof value == 'symbol')
          symbolTable[fullName] = target[name] = value;

        else
          assert.fail();
      }
      names.pop();
    }

    return target;
  }

  return walk(target, descriptor); 
}

module.exports = defineSymbols;