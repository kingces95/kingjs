/**
 * @description Returns own property names and symbols in an array.
 * 
 * @this any The object whose own property names and symbols will be returned.
 * 
 * @returns Returns own property names and symbols in an array.
 */
function getOwnPropertyKeys() {
  var names = Object.getOwnPropertyNames(this);
  var symbols = Object.getOwnPropertySymbols(this);
  var keys = names.concat(symbols);
  return keys;
}

module.exports = getOwnPropertyKeys;