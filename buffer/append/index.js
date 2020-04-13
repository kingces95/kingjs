var { 
  ['@kingjs']: {
    reflect: { is, exportExtension },
  }
} = require('./dependencies');

var EmptyString = ''

/**
 * @description Append buffers to a buffer. 
 * 
 * @this any The source buffer.
 * @param any The buffers to append.
 * 
 * @returns Returns a buffer.
 */
function append() {
  return Buffer.concat([this, ...arguments].map(o => {
    if (is.string(o))
      return Buffer.from(o)
    return o
  }))
}

exportExtension(module, Buffer, append)
