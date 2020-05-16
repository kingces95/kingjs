var { 
  '@kingjs': {
    IEnumerable,
    '-interface': { ExportExtension },
    '-linq': { Concat },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates an sequence identical to another 
 * sequence but with a value added to the end.
 */
function append(value) {    
  return this[Concat]([ value ])
}

module[ExportExtension](IEnumerable, append)