var { 
  '@kingjs': {
    IEnumerable,
    '-module': { ExportInterfaceExtension },
    '-linq': { Concat,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates an sequence identical to another 
 * sequence but with a value added to the end.
 */
function append(value) {    
  return this[Concat](of(value))
}

module[ExportInterfaceExtension](IEnumerable, append)