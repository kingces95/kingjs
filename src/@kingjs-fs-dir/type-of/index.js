var {
  '@kingjs': {
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function typeOf(o) {
  if (o.isFile()) return 'file'
  if (o.isDirectory()) return 'directory'
  if (o.isSymbolicLink()) return 'symbolicLink'
  if (o.isSocket()) return 'socket'
  if (o.isBlockDevice()) return 'blockDevice'
  if (o.isCharacterDevice()) return 'characterDevice'
  if (o.isFIFO()) return 'fifos'
  assert.fail(`Failed to identify type of Dirent '${o}'`)
}

module.exports = typeOf