var { 
  ['@kingjs']: { fs: { promises: { findRoot } } }
} = require('./dependencies')

var npmScopeJson = 'npm-scope.json'

/**
 * @description Search up the path for `npm-scope.json`.
 * 
 * @param [dir] The directory to begin the search for `npm-scope.json`. 
 * Default is current working directory.
 * 
 * @returns Returns the path to `npm-scope.json`.
 */
async function findNpmScope(dir = process.cwd()) {
  return findRoot(dir, npmScopeJson)
}

module.exports = findNpmScope