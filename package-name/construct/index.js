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
  var result = parts.map(x => {
    if (x instanceof Array)
      return x.join(Dash).toLowerCase();
    return x
  }).join(Period);

  if (scope) {
    scope = scope.toLowerCase();
    result = `${AtSymbol}${scope}${ForwardSlash}${result}`;
  }

  return result;
}

module.exports = construct;