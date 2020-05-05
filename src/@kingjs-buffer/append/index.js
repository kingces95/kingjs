// Append is used by @kingjs-module/dependencies
var ExportExtension = require('@kingjs-module/export-extension')

/**
 * @description Append buffers to a buffer. 
 * 
 * @this any The source buffer.
 * @param any The buffers to append.
 * 
 * @returns Returns a buffer.
 */
function append() {
  return Buffer.concat([this, ...arguments]
    .filter(o => o)
    .map(o => {
      if (typeof o == 'string')
        return Buffer.from(o)
      return o
    })
  )
}

module[ExportExtension](Buffer, append)
