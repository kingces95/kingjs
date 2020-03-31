const fs = require('fs')
const Path = require('path')

function tryLstat(path) {
  return new Promise(resolve => 
    fs.lstat(path, (error, lstat) => resolve(error ? null : lstat))
  )
}

/**
 * @description Creates a symbolic link to `toDir` at `fromDir`.
 * 
 * @param toDir The target of the symbolic link. 
 * @param fromDir The symbolic link path.
 * 
 * @returns Returns an asynchronous enumerator suitable for passing
 * to `run`.
 * 
 * @remarks The directory hosting the symbolic link will be created
 * if it doesn't already exist. If the symbolic link already exists,
 * then it is ignored as opposed to being overwritten.
 * @remarks If a symbolic link is created, a message will be logged
 * to the console.
 */
async function makeLink(toDir, fromDir) {
  var fromDirParent = Path.dirname(fromDir)
  await fs.promises.mkdir(fromDirParent, { recursive: true })
  
  var toDirRelativePath = Path.relative(fromDirParent, toDir)

  var stat = await tryLstat(fromDir)
  if (stat && stat.isSymbolicLink()) {
    var existingToDir = await fs.promises.readlink(fromDir)
    if (existingToDir == toDirRelativePath)
      return

    // allow symlink to throw an exception
  }

  await fs.promises.symlink(toDirRelativePath, fromDir, 'dir')
}

module.exports = makeLink