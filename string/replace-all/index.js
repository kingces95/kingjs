var assert = require('assert');

/**
 * @description Returns a new string in which all occurrences of a 
 * substring are replaced with another string.
 * @this any The string to search and replace.
 * @param oldValue The string to be replaced.
 * @param newValue The string to replace all occurrences of `oldValue`.
 * @returns A string that is equivalent to the current string except 
 * that all instances of `oldValue` are replaced with `newValue`.
 */
function replaceAll(oldValue, newValue) {
  var regex = new RegExp(escapeRegExp(oldValue), 'g');
  return this.replace(regex, newValue);
};

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = replaceAll;