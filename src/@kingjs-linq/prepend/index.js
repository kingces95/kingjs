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
 * sequence but with a value added to the start.
 * 
 * @param {*} value 
 */
function prepend(value) {
  return of(value)[Concat](this)
}

module[ExportInterfaceExtension](IEnumerable, prepend)
