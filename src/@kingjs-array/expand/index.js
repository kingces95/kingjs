var {
  '@kingjs': {
    '-module': { ExportExtension },
    '-string': { Expand }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyString = ''
var EmptyObject = { }

/**
 * @description Joins the expansions of `template` for each pojo in the array
 * with optional `separator`, `prefix`, and `suffix` while also introducing loop
 * iteration variable `i`.
 * 
 * @this any Array of pojos to merge into the substitutions before expansion.
 * 
 * @param template The template to expand.
 * @param [substitutions] The substitutions to be passed during expansion
 * @param [separator] The separator used to join the template expansions
 * @param [prefix] A prefix for the result string
 * @param [suffix] A suffix for the result string
 * 
 * @remarks - During template expansion, each pojo in the array is merged 
 * with `substitutions` and the loop iteration variable `i`. 
 * @remarks - An empty string is returned if the array is empty.
 */
function expand(
  template, 
  substitutions = EmptyObject, 
  separator = EmptyString, 
  prefix = EmptyString, 
  suffix = EmptyString) {

  if (!this.length)
    return EmptyString

  var expansions = [ ]
  for (var i = 0; i < this.length; i++) {
    expansions.push(template[Expand]({ 
      ...substitutions, i, ...this[i] 
    }))
  }

  return `${prefix}${expansions.join(separator)}${suffix}`
}

module[ExportExtension](Array, expand)