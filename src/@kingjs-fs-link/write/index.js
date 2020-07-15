var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-fs': {
      '-dir': { Make: MakeSync },
      '-promises-dir': { Make: MakeAsync },
    },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Dir = 'dir'
var File = 'file'
var EmptyObject = { }
var writeLinkSync = fs.symlinkSync.bind(fs)
var writeLinkAsync = fsp.symlink.bind(fsp)

/**
 * @description Links a path to a directory or file target.
 * 
 * @this PathBuilder The symlink.
 * @param target The target directory of the symlink.
 * @param [isFile] True if the target is a file.
 * 
 * @returns Returns the relative path from `this` to `target`.
 */
function write(target, options = EmptyObject) {
  var { isFile, async } = options
  var link = this.toRelativeFile(target)

  return (async ? writeAsync : writeSync).call(this, link, isFile)
}

async function writeAsync(link, isFile) {
  if (!isFile)
    await this.dir[MakeAsync]()

  await writeLinkAsync(link.buffer, this.buffer, isFile ? File : Dir)

  return link
}

function writeSync(link, isFile) {
  if (!isFile)
    this.dir[MakeSync]()

  writeLinkSync(link.buffer, this.buffer, isFile ? File : Dir)

  return link
}

module[ExportExtension](Path.Builder, write)