'use strict';

var EmptyString = '';

function toUpperFirst(name) {
  return name[0].toUpperCase() + name.substring(1);
}

/**
 * @description Capitalizes an array of strings and joins them together.
 * 
 * @param names Array of names to join together into a camel case string.
 * @param [capitalize] True if the result should be capitalized.
 * 
 * @returns Returns a camel case string, optionally capitalized, or null.
 */
function join(names, capitalize) {
  if (!names || names.length == 0)
    return null;

  var result = names.map((x, i) => 
    i == 0 && !capitalize ?
    x : toUpperFirst(x)).join(EmptyString);

  if (!result)
    return null;

  return result;
}

module.exports = join;