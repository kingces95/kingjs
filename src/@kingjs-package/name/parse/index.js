var packageNameRx = /^([@]([a-z\d]+)[/])?([a-z\d-_.]+)$/
var scopeCaptureGroup = 2
var nameCaptureGroup = 3

var Period = '.'
var Dash = '-'

/**
 * @param fqn The fully qualified name of the package to parse.
 * @param delimiter The parts delimiter (either `-` or `_`)
 * @returns Returns an AST of literals comprising the package name.
 */
function parse(fqn, delimiter = Dash) {
  var result = fqn.match(packageNameRx)
  if (!result)
    return

  var scope = result[scopeCaptureGroup]
  var fullName = result[nameCaptureGroup]
  var segments = fullName.split(Period)
  var parts = segments.map(x => x.split(delimiter))

  return { fqn, scope, fullName, segments, parts }
}

module.exports = parse