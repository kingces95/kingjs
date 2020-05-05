var { 
  ['@kingjs']: {
    Path,
    module: {
      ExportExtension
    },
    fs: { 
      promises: { 
        Probe 
      } 
    } 
  }
} = module[require('@kingjs-module/dependencies')]()

var npmScopeJson = 'npm-scope.json'

/**
 * @description Search up the path for `npm-scope.json`.
 * 
 * @this any The directory to begin the search for `npm-scope.json`. 
 * 
 * @returns Returns the path to `npm-scope.json`.
 */
async function resolveNpmScope() {
  return this[Probe](npmScopeJson)
}

module[ExportExtension](Path.Builder, resolveNpmScope)