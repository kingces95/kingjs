var {
  path,
  shelljs 
} = require('./dependencies');

/**
 * @description Returns the git root directory.
 * 
 * @param [subDir] A sub-directory to join to the git root directory.
 * 
 * @returns Returns the git root directory.
 */
function getDir(subDir) {
  var result = shelljs.exec(
    'git rev-parse --show-toplevel', 
    { silent:true }
  ).stdout.trim();

  if (subDir)
    result = path.join(result, subDir);

  return result;
}

module.exports = getDir;