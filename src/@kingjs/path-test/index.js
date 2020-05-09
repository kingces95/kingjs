var {
  assert,
  path: Path,
  minimatch,
  '@kingjs': {
    reflect: { is }
  }
} = module[require('@kingjs-module/dependencies')]();

var MinimatchOptions = { dot: true }

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
