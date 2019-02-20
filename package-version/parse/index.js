
var regex = /^(\d+)\.(\d+).(\d+)$/
/**
 * @description Parse `'major.minor.version'` into `{ major, minor, version }`.
 * 
 * @param version A version string typically taken from `package.json`.
 * 
 * @returns Returns `{ major, minor, version }` where the fields are numbers
 * parsed from `version`.
 */
function parse(version) {
  var { 
    '1': major,
    '2': minor,
    '3': patch
  } = version.match(regex);

  major = Number(major);
  minor = Number(minor);
  patch = Number(patch);

  return {
    major,
    minor,
    patch
  }
}

module.exports = parse;