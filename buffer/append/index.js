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
  return Buffer.concat([this, ...arguments])
}

exportExtension(module, Buffer, append)
