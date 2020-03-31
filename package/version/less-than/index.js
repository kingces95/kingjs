var {
  ['@kingjs']: {
    is,
    package: { version: { parse } }
  }
} = require('./dependencies');

/**
 * @description Compare if one version is less than another. 
 * 
 * @param lhs A version string or object of the form `{ major, minor, patch }`.
 * @param rhs A version string or object of the form `{ major, minor, patch }`.
 * 
 * @returns Returns `true` if `lhs` is less than `rhs`.
 */
function lessThan(lhs, rhs) {
  if (is.string(lhs))
    lhs = parse(lhs);

  if (is.string(rhs))
    rhs = parse(rhs);

  if (lhs.major < rhs.major)
    return true;

  if (lhs.minor < rhs.minor)
    return true;

  if (lhs.patch < rhs.patch)
    return true;

  return false;
}

module.exports = lessThan;