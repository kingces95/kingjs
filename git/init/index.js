var {
  shelljs 
} = require('./dependencies')

var AddedSwitch = '--other --exclude-standard'
var DeletedSwitch = '-d'
var Line = /\r?\n/;

/**
 * @description Returns the files tracked by git in the current directory 
 * and sub-directories including the index (added and deleted files).
 * 
 * @returns Returns an array of paths to tracked files.
 */
function getFiles() {

  var trackedFiles = ls()
  var deletedFiles = ls(DeletedSwitch)
  var addedFiles = ls(AddedSwitch)

  // merge tracked, added, and deleted files
  var files = trackedFiles
    .filter(o => deletedFiles.indexOf(o) == -1)
    .concat(addedFiles)

  return files

  function ls(options = '') {
    var cmd = `git ls-files ${options}`
    var result = shelljs.exec(
      cmd, 
      { silent:true }
    )
  
    if (result.code) 
      throw result.stderr
    
    return result.stdout.trim().split(Line)
  }
}

module.exports = getFiles