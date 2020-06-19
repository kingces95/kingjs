var { 
  '@kingjs': { 
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Return a hashcode for a string.
 * @this this The string.
 * @return Returns a hashcode for `string`.
 */
function getHashcode() {
  var hashcode = 0
  for (var i = 0; i < this.length; i++)
    hashcode ^= this.charCodeAt(i)
  return hashcode
}

module[ExportExtension](String, getHashcode)