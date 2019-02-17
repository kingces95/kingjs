var AtSymbol = '@';
var ForwardSlash = '/';
var Period = '.';
var Dash = '-';

/**
 * @param scope The package scope.
 * @param parts An array of arrays of strings joined with dash then period.
 * @returns Returns the package name.
 */
function construct(scope, parts) {
  scope = scope.toLowerCase();
  var names = parts.map(x => x.join(Dash).toLowerCase());
  return `${AtSymbol}${scope}${ForwardSlash}${names.join(Period)}`;
}

module.exports = construct;