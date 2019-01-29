var { 
  ['@kingjs']: { 
    defineExtension
  }
} = require('./dependencies');

var { name, version } = require('./package.json');

var Name = 'name';

/**
 * @description Renames a function.
 * 
 * @this any The function to rename.
 * 
 * @param string The name to assign the function.
 * 
 * @returns Returns the function.
 */
function rename(name) {
  return Object.defineProperty(this, Name, { 
    configurable: true,
    value: name
  });
}

module.exports = defineExtension(
  Function.prototype,
  name, version,
  rename
);