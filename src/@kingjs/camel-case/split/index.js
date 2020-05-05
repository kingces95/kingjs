'use strict';

/**
 * @description Splits a string on its capital letters.
 * 
 * @param name A camel case name to split.
 * 
 * @returns Array of names, all lower case, composing the camel case name.
 */
function split(name) {
  if (!name)
    return [];

  return name.split(/(?=[A-Z])/).map(x => x.toLowerCase());  
}

module.exports = split;