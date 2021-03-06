/**
 * @description A mapping from symbol to name for 
 * each `Symbol` property whose value is a symbol.
 */
var builtInSymbols = { };

for (var name of Object.getOwnPropertyNames(Symbol)) {
  var value = Symbol[name];
  if (typeof value != 'symbol')
    continue;
  builtInSymbols[value] = name;
}

module.exports = builtInSymbols;