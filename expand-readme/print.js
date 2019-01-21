var {
  ['@kingjs']: { 
    string: { replaceAll }
  }
} = require('./dependencies');

function print(template, descriptor) {

  // escape back-ticks
  template = replaceAll.call(template, '`', '\\`');

  // create and invoke function to expand template literal
  var keys = Object.keys(descriptor);
  var values = keys.map(x => descriptor[x]);
  return Function(...keys, `return \`${template}\`;`)(...values);
}

module.exports = print;