var {
  '@kingjs': {
    '-array': { typeOf, Partition },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var CompareDirent = (l, r) => l.name < r.name

var typeOfPlurals = {
  file: 'files',
  directory: 'directories',
  symbolicLink: 'symbolicLinks',
  socket: 'sockets',
  blockDevice: 'blockDevices',
  characterDevice: 'characterDevices',
  fifo: 'fifos'
}

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function partition() {
  return this
    .sort(CompareDirent)
    [Partition](
      o => typeOfPlurals[typeOf(o)],
      o => o.name
    )
}

module[ExportExtension](Array, partition)