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

  if (scope)
    scope = AtSymbol + scope.toLowerCase()
  
  if (!parts || !parts.length)
    return scope
  
  parts = parts.map(x => {
    if (x instanceof Array)
      return x.join(delimiter).toLowerCase();
    return x
  }).join(Period);

  if (!scope)
    return parts

  return [scope, parts].join(ForwardSlash)
}

module.exports = construct;