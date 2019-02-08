var assert = require('assert');

/**
 * @description Simply join `{ major, minor, patch }` into `'major.minor.patch'`.
 * 
 * @param version An object `{ major, minor, patch }`
 * 
 * @returns Return `'major.minor.patch'` corresponding to `version`.
 */
function construct(version) {
  return `${version.major}.${version.minor}.${version.patch}`
}

module.exports = construct;