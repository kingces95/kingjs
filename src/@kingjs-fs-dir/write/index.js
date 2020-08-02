var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Dir = 'dir'
var File = 'file'

var writeSync = fs.writeFileSync.bind(fs)
var writeLinkSync = fs.symlinkSync.bind(fs)

var writeAsync = fsp.writeFile.bind(fsp)
var writeLinkAsync = fsp.symlink.bind(fsp)

/**
 * @description Create a file and write data to that file.
 * 
 * @this PathBuilder The directory of the file.
 * @param name The name of the file.
 * @param data The data to write which can be string or, if `options.link`, a path to a directory.
 * @param options A pojo of the form `{ async, link, name }`.
 * @returns Returns the path of the file.
 * 
 * @remarks If the file exists, it is overwritten.
 * @remarks If `options.async` then a promise to the path of the file is returned.
 * @remarks If `options.link`, then the file type will be a symbolic link and `data`
 * will be used as the path to the directory targeted by the link. If `options.name` 
 * is also passed, then the symbolic link will target a file of that name in that 
 * directory instead of the directory itself.
 */
function write(name, data, options = EmptyObject) {
  var { async, link } = options
  var path = this.to(name)

  if (link)
    return writeLink(path, data, options)

  var promise = (async ? writeAsync : writeSync)(path.buffer, data, options)
  return async ? promise.then(() => path) : path
}

function writeLink(path, dir, options = EmptyObject) {
  var { name, async } = options
  var link = path.dir.toRelative(dir)

  var fileOrDir = Dir
  if (name) {
    fileOrDir = File
    link = link.to(name)
  }

  var promise = (async ? writeLinkAsync : writeLinkSync)(link.buffer, path.buffer, fileOrDir)
  return async ? promise.then(() => path) : path
}

module[ExportExtension](Path.Builder, write)