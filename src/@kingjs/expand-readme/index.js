var {
  fs, path,
  '@kingjs': { 
    stringEx: { Expand },
    source: { 
      parse: parseSource,
      GetInfo
    },
    package: {
      source: {
        parse: {
          sourceFile: { GetFirstDocumented }
        }
      },
      name: {
        parse
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var printJoin = require('./print-join')

var NpmPackageUrl = 'https://www.npmjs.com/package/'
var TemplateDir = '.md'
var TemplateName = './README.t.md'
var ReadmeName = 'README.md'
var PackageName = 'package.json'
var UTF8 = 'utf8'

async function expand(templateRelPath) {
  if (!templateRelPath)
    templateRelPath = joinPath(TemplateDir, TemplateName)

  var cwd = process.cwd()

  // parse package.json
  var packageJson = require(joinPath(cwd, PackageName))

  // slice out parse json
  var { 
    main,
    name, version, description, license, dependencies, 
    repository: { url: repository },
  } = packageJson

  // parse package name
  var { namespaces, segments } = parse(name)

  // parse index.js
  var mainPath = joinPath(cwd, main)
  var ast = await parseSource(mainPath)
  var mainFunction = ast[GetFirstDocumented]()
  var {
    api, parameters, remarks, returns, see
  } = mainFunction[GetInfo]()

  // gather substitutions
  var descriptor = {
    npmjs: NpmPackageUrl, 

    // jsdoc
    api, parameters, remarks, returns, see, 

    // package.json
    name, version, description, license, dependencies, repository, 
    namespaces, segments,

    // functions
    join: (template, source, separator, keys) => 
      printJoin(template, descriptor, source, separator, keys),

    expand,
    canExpand: (relPath) => fs.existsSync(joinExpandPath(relPath)),

    include, 
    canInclude: (relPath) => fs.existsSync(joinIncludePath(relPath)),
  }

  // find template
  var templatePath = joinPath(cwd, templateRelPath)
  var expandBasePath = path.dirname(templatePath)
  var stack = [ expandBasePath ]

  // include template
  var result = expand(templatePath)
  var readmePath = joinPath(cwd, ReadmeName)
  fs.writeFileSync(readmePath, result)
  return

  function include(relPath) {
    var fullPath = joinIncludePath(relPath) 
    var text = fs.readFileSync(fullPath, UTF8)
    return text
  }

  function joinPath(basePath, relPath) {
    if (path.isAbsolute(relPath))
      return relPath
    return path.join(basePath, relPath)
  }

  function joinIncludePath(relPath) {
    return joinPath(cwd, relPath)
  }

  function joinExpandPath(relPath) {
    return joinPath(expandBasePath, relPath)
  }

  function expand(relPath) {
    var fullPath = joinExpandPath(relPath)

    stack.push(expandBasePath)
    expandBasePath = path.dirname(fullPath)
    {
      var text = include(fullPath)
      text = text[Expand](descriptor)
    }
    expandBasePath = stack.pop()
    return text
  }
}

module.exports = expand