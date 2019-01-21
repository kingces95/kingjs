var {
  ['@kingjs']: { 
    string: { replaceAll }
  }
} = require('./dependencies');

/**
 * @description Given a string with the format of a template literal, 
 * expand its placeholders with the values corresponding to a
 * descriptor's keys.
 * 
 * @this any A string with the format of a template literal.
 * 
 * @param [descriptor] The values to substitute for the 
 * placeholders in `this`.
 * 
 * @returns A string whose placeholder have been replaced with the 
 * values of the corresponding descriptor keys.
 */
function expand(descriptor) {

  if (!descriptor)
    return this;

  // escape back-ticks
  var result = replaceAll.call(this, '`', '\\`');

  // create and invoke function to expand template literal
  var keys = Object.keys(descriptor);
  var values = keys.map(x => descriptor[x]);
  return Function(...keys, `return \`${result}\`;`)(...values);
}

module.exports = expand;