var { 
  assert,
  '@kingjs': {
    module: { ExportExtension }
  }
} = require('./dependencies')

/**
 * @description The description.
 * 
 * @this any `this` comment.
 * 
 * @param foo `foo` comment.
 * 
 * @returns Returns comment.
 */
function xxx(foo) {
}

module[ExportExtension](Type, xxx)