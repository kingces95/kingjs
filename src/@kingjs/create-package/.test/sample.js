var {
  '@kingjs': { 
    git: { getDir },
    stringEx: { 
      capitalize,
      ReplaceAll: replace 
    }
  },
  ['foo/bar']: { baz, moo }
} = require('../dependencies');

/**
 * @description A description
 * that spans a line.
 */
function goodStuff() { }