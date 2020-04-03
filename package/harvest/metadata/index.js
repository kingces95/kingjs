#!/usr/bin/env node --no-warnings
var {
  Path, assert,
  ['@kingjs']: { 
    stringEx: { ReplaceAll },
    json: { file: { read: readJsonFile } },
    package: {
      findNpmScope,
      name: { 
        parse, 
        construct,
      },
      source: {
        objectBindingPattern: { 
          ToPackageNames 
        },
        sourceFile: {
          GetFirstDocumented
        }
      }
    },
    fs: { promises: { exists } },
    source: {
      parse: parseSource,
      GetInfo
    }
  },
} = require('./dependencies')

var Period = '.'
var ForwardSlash = '/'
var At = '@'

/**
 * @description Creates or updates fields of `package.json`
 * that can be inferred from the surrounding environment.
 * 
 * @remarks The following are harvested from environment:
 * @remarks - `description`: The first JsDoc `description` found in the `main` js file.
 * @remarks - `name`: A join with period of the relative path of this package in the repository.
 * @remarks - `repository.url`: `https://repository.kingjs.net/` plus a
 * join with forward slash of the relative paths in the repository.
 */
async function harvestMetadata(packageDir, npmScopePath) {
  var npmScopePath = npmScopePath || await findNpmScope(packageDir)
  var packageRelDir = Path.relative(Path.dirname(npmScopePath), packageDir)
  var { 
    name,
    main,
    license,
    repository: { 
      url, 
      type 
    },
  } = await readJsonFile(npmScopePath)

  return {
    name: getNameFromPath(packageRelDir, name),
    main,
    description: await getDescription(Path.join(packageDir, main)),
    license,
    repository: {
      type,
      url: getRepositoryFromPath(packageRelDir, url)
    },
  }
}

async function getDescription(mainPath) {
  if (await exists(mainPath) == false) 
    return

  var ast = await parseSource(mainPath)
  assert(ast)

  var firstDocumented = ast[GetFirstDocumented]()
  if (!firstDocumented)
    return

  var functionDeclaration = firstDocumented[GetInfo]()
  if (!functionDeclaration)
    return

  return functionDeclaration.description
}

function getNameFromPath(packageRelDir, scope) {
  return `${At}${scope}/${packageRelDir[ReplaceAll](Path.sep, Period)}`
}

function getRepositoryFromPath(packageRelDir, url) {
  return `${url}${packageRelDir[ReplaceAll](Path.sep, ForwardSlash)}`
}

module.exports = harvestMetadata