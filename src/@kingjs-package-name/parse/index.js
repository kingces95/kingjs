var packageNameRx = /^([@]([a-z\d-]+)[/])?([a-z\d-_]+)$/
var scopeCaptureGroup = 2
var nameCaptureGroup = 3

var Dash = '-'

/**
 * @param name The fully qualified name of the package to parse.
 * @param delimiter The parts delimiter (either `-` or `_`)
 * @returns Returns an AST of literals comprising the package name.
 */
function parse(name, delimiter = Dash) {
  var result = name.match(packageNameRx)
  if (!result)
    return

  var scope = result[scopeCaptureGroup]
  var fullName = result[nameCaptureGroup]
  var parts = fullName.split(delimiter)

  return { scope, fullName, parts }
}

module.exports = parse