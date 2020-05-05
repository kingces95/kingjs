var { 
  fs: { promises: fs },
  ['@kingjs']: { 
    Path,
    fs: { promises: { dir: { Make } } },
    module: { ExportExtension },
  }
} = require('./dependencies')

var Utf8 = 'utf8'

/**
 * @description Links a path to a directory or file target.
 * 
 * @this PathBuilder The symlink.
 * @param raw If true, returns the target of the link relative to its directory.
 * 
 * @returns Returns the target path of the link.
 */
async function read(raw) {
  var link = Path.parse(await fs.readlink(this.buffer, Utf8))
  
  if (raw)
    return link

  return this.dir.to(link)
}

module[ExportExtension](Path.Builder, read)