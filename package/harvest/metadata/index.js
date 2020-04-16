#!/usr/bin/env node --no-warnings
var {
  Path, 
  assert,
  ['@kingjs']: { 
    path: { Builder: Path },
    module: { ExportExtension },
    stringEx: { ReplaceAll },
    json: { file: { Read: ReadJsonFile } },
    package: {
      resolve: { NpmScope: ResolveNpmScope },
      source: { sourceFile: { GetFirstDocumented } }
    },
    fs: { promises: { Exists } },
    source: {
      Parse: ParseSource,
      GetInfo
    }
  },
} = require('./dependencies')

var EmptyString = ''
var Period = '.'
var ForwardSlash = '/'
var At = '@'
var ZeroVersion = '0.0.0'

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
async function harvestMetadata(npmScopePath) {
  var packageDir = this
  var npmScopePath = npmScopePath || await packageDir[ResolveNpmScope]()
  var packageRelDir = npmScopePath.dir.toRelative(packageDir)

  var { 
    name: scope,
    repository: { 
      url, 
      type 
    },
    packageDefaults: {
      version = ZeroVersion,
      main,
      license,
    }
  } = await npmScopePath[ReadJsonFile]()

  return {
    name: getNameFromPath(packageRelDir, scope),
    version,
    main,
    description: await getDescription(packageDir.to(main)),
    license,
    repository: {
      type,
      url: getRepositoryFromPath(packageRelDir, url)
    },
  }
}

async function getDescription(mainPath) {
  if (await mainPath[Exists]() == false) 
    return EmptyString

  var ast = await mainPath[ParseSource]()
  assert(ast)

  var firstDocumented = ast[GetFirstDocumented]()
  if (!firstDocumented)
    return EmptyString

  var functionDeclaration = firstDocumented[GetInfo]()
  if (!functionDeclaration)
    return EmptyString

  return functionDeclaration.description
}

function getNameFromPath(packageRelDir, scope) {
  packageRelDir = packageRelDir.toString()
  return `${At}${scope}/${packageRelDir[ReplaceAll](Path.sep, Period)}`
}

function getRepositoryFromPath(packageRelDir, url) {
  packageRelDir = packageRelDir.toString()
  return `${url}${packageRelDir[ReplaceAll](Path.sep, ForwardSlash)}`
}

module[ExportExtension](Path, harvestMetadata)