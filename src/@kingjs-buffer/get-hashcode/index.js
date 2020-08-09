var { 
  '@kingjs': { 
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Return a hashcode for a buffer.
 * @this this The string.
 * @return Returns a hashcode for `string`.
 */
function getHashcode() {
  return Array.prototype.reduce.call(
    this, 
    (a, o, i) => a ^ o << (i % 32), 
    0
  )
}

module[ExportExtension](Buffer, getHashcode)