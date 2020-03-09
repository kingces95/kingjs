var AtSymbol = '@';
var ForwardSlash = '/';
var Period = '.';
var Dash = '-';

/**
 * @param scope The package scope.
 * @param parts An array of arrays of strings joined with dash then period.
 * @param delimiter The token to use when joining parts.
 * 
 * @returns Returns the package name.
 */
function construct(scope, parts, delimiter = Dash) {

  var result = parts.map(x => {
    if (x instanceof Array)
      return x.join(delimiter).toLowerCase();
    return x
  }).join(Period);

  if (scope) {
    scope = scope.toLowerCase();
    result = `${AtSymbol}${scope}${ForwardSlash}${result}`;
  }

  return result;
}

module.exports = construct;