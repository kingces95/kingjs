var { fs, fs: { promises: fsp }, assert,
  '@kingjs': { EmptyObject, EmptyBuffer, Path, PathBuilder,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var Dir = 'dir'
var File = 'file'

var writeLinkSync = fs.symlinkSync.bind(fs)
var writeLinkAsync = fsp.symlink.bind(fsp)

/**
 * @description Create a symbolic link.
 * 
 * @this PathBuilder The directory hosting the link.
 * @param name the name of the link.
 * @param dir The path to a directory targeted by the link.
 * @param options A pojo of the form `{ async, name }`.
 * @returns Returns the path of the link.
 * 
 * @remarks If the link exists, it is overwritten.
 * @remarks If `options.async`, then a promise to the path of the link is returned.
 * @remarks If `options.name`, then the symbolic link will target a file of that name 
 * in that directory instead of the directory itself.
 */
function symlinkTo(name, dir, options = EmptyObject) {
  assert.ok(dir instanceof PathBuilder)
  var path = this.to(name)
  var { name, async } = options
  var link = this.toRelative(dir)

  var fileOrDir = Dir
  if (name) {
    fileOrDir = File
    link = link.to(name)
  }

  var promise = (async ? writeLinkAsync : writeLinkSync)(
    link.buffer, path.buffer, fileOrDir)
  return async ? promise.then(() => path) : path
}

module[ExportExtension](Path.Builder, symlinkTo)