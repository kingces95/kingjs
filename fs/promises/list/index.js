var { 
  fs: { promises: fs },
  ['@kingjs']: {
    array: {
      Partition
    },
    path: {
      Builder: Path
    },
    defineExtension,
  }
} = require('./dependencies')

var { name, version } = require('./package.json')
var EmptyObject = { }
var CompareDirent = (l, r) => l.name < r.name

function getPartition(o) {
  if (o.isFile()) return 'files'
  if (o.isDirectory()) return 'directories'
  if (o.isSymbolicLink()) return 'symbolicLinks'
  if (o.isSocket()) return 'sockets'
  if (o.isBlockDevice()) return 'blockDevices'
  if (o.isCharacterDevice()) return 'characterDevices'
  assert.ok(o.isFIFO(), `Failed to identify type of Dirent '${o}'`)
  return 'fifos'
}

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
async function list(options = EmptyObject) {
  var listing = await fs.readdir(this.buffer, options)

  if (options.withFileTypes) {
    return listing
      .sort(CompareDirent)
      [Partition](
        o => getPartition(o),
        o => this.to(o.name)
      )
  }

  return listing
    .map(o => this.to(o))
    .sort()
}

module.exports = defineExtension(
  Path.prototype, name, version, list
);