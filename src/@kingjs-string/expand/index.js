var {
  '@kingjs-module': { 
    ExportExtension 
  },
  '@kingjs-string': {
    ReplaceAll
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Given a string with the format of a template literal, 
 * expand its placeholders with the values corresponding to a
 * pojo's keys.
 * 
 * @this any A string with the format of a template literal.
 * 
 * @param [pojo] The values to substitute for the 
 * placeholders in `this`.
 * 
 * @returns A string whose placeholder have been replaced with the 
 * values of the corresponding pojo keys.
 */
function expand(pojo = EmptyObject) {

  // escape back-ticks
  var result = this[ReplaceAll]('`', '\\`')

  // create and invoke function to expand template literal
  var keys = Object.keys(pojo)
  var values = keys.map(x => pojo[x])
  return Function(...keys, `return \`${result}\``)(...values)
}

module[ExportExtension](String, expand)