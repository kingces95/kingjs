var { fs: { promises: fs },
  '@kingjs': { Path,
    '-fs-promises-dir': { Make },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Dir = 'dir'
var File = 'file'

/**
 * @description Links a path to a directory or file target.
 * 
 * @this PathBuilder The symlink.
 * @param target The target directory of the symlink.
 * @param [isFile] True if the target is a file.
 * 
 * @returns Returns the relative path from `this` to `target`.
 */
async function write(target, isFile = false) {
  if (!isFile)
    await this.dir[Make]()

  var link = this.toRelativeFile(target)
  await fs.symlink(link.buffer, this.buffer, isFile ? File : Dir)

  return link
}

module[ExportExtension](Path.Builder, write)