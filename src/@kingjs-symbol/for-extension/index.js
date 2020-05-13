var assert = require('assert')

function forExtension(scope, package, version) {
  return Symbol.for(`${package}, ${scope}, v${version}`)
}

module.exports = forExtension