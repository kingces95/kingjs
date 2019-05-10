var {
  assert,
  path: Path,
  minimatch,
  ['@kingjs']: {
    reflect: { is }
  }
} = require('./dependencies');

var EmptyArray = []
var MinimatchOptions = { dot: true }

/**
 * @description Joins a relative path to an absolute path or, if the
 * relative path is already absolute, return it as is.
 * 
 * @param relative A relative or absolute path.
 * @param [base] An absolute path to be used as a base path. Defaults
 * to the present working directory.
 * 
 * @returns Returns `relative` joined to `base` or, if `relative` is 
 * already absolute then returns `relative` as is.
 */
function test(
  path, 
  tests) {

  return tests.some(test => {
    if (is.regex(test))
      return test.test(path)

    assert(is.string(test))
    return minimatch(path, test, MinimatchOptions)
  })
};

module.exports = test;
