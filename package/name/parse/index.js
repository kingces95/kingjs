var packageNameRx = /^([@]([a-z\d]+)[/])?([a-z\d-_.]+)$/
var scopeCaptureGroup = 2
var nameCaptureGroup = 3

var Period = '.'
var Dash = '-'

/**
 * @param name The package name to parse.
 * @param delimiter The parts delimiter (either `-` or `_`)
 * @returns Returns an AST of literals comprising the package name.
 */
function parse(name, delimiter = Dash) {
  var result = name.match(packageNameRx)
  if (!result)
    return

  var scope = result[scopeCaptureGroup]
  var fullName = result[nameCaptureGroup]
  var names = fullName.split(Period)
  var parts = names.map(x => x.split(delimiter))

  return { scope, fullName, names, parts }
}

module.exports = parse