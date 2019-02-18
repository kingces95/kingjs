var a, b, c;
var ok = { foo: 1 + 1 }, ok2 = { yo: ok };

/**
 * @description Hello world!
 */
var {
  ['@kingjs']: { 
    git: { getDir },
    stringEx: { 
      capitalize,
      ReplaceAll: replace 
    }
  },
  ['foo/bar']: { baz, moo }
} = require('../dependencies');

var foo = {
  a: 'a',
  b: 0,
  c: true,
  d: null
}