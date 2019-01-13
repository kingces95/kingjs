'use strict';
function print(template, descriptor) {

  // escape back-ticks
  template = template.replace(/`/g, '\\`')

  // create and invoke function to expand template literal
  var keys = Object.keys(descriptor);
  var values = keys.map(x => descriptor[x]);
  return Function(...keys, `return \`${template}\`;`)(...values);
}

module.exports = print;