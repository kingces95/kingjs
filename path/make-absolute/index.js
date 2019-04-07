var { 
  path: Path,
  ['@kingjs']: {
    reflect: { exportExtension },
  }
} = require('./dependencies');

/**
 * @description Joins a relative path to an absolute path or, if the
 * relative path is already absolute, return it as is.
 * 
 * @param relative A relative or absolute path.
 * @param [base] An absolute path to be used as a base path. Defaults
 * to the present working directory.
 * 
 * @returns Returns `relative` joined to `base` or, if `relative` is 
 * already absolute then returns `relative` as is.
 */
function makeAbsolute(relative, base = process.cwd()) {    
  if (Path.isAbsolute(relative))
    return relative;
  return Path.join(base, relative);
};

module.exports = makeAbsolute;
