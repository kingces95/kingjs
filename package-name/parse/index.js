
'use strict';
var packageNameRx = /^([@]([a-z\d]+)[/])?([a-z\d-.]+)$/;
var scopeCaptureGroup = 2;
var nameCaptureGroup = 3;

var Period = '.';
var Dash = '-';

/**
 * @param name The package name to parse.
 * @returns Returns an AST of literals comprising the package name.
 */
function parse(name) {
  var result = name.match(packageNameRx);
  if (!result)
    return;

  var scope = result[scopeCaptureGroup];
  var fullName = result[nameCaptureGroup];
  var names = fullName.split(Period);
  var parts = names.map(x => x.split(Dash));

  return { scope, fullName, names, parts };
}

module.exports = parse;