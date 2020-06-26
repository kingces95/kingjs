var {
  '@kingjs': {
    '-array': { Partition },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

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
    [Partition](
      o => typeOfPlurals[o.type],
      o => o.name
    )
}

module[ExportExtension](Array, partition)