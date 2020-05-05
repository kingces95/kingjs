var {
  '@kingjs': { 
    Path,
    module: { ExportExtension },
    fs: { 
      Probe,
      file: { Expand, Read },
      promises: {
        Exists,
        file: {
          Write: WriteFile 
        }
      } 
    },
    pojo: { Expand },
    json: { file: { Read: ReadJsonFile } },
    source: { 
      Parse,
      GetInfo
    },
    package: {
      scope: { Probe: ResolveNpmScope },
      source: { parse: { sourceFile: { GetFirstDocumented } } },
      name: { parse }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var TemplateDir = '.md'
var TemplateName = 'readme.t.md'
var ReadmeName = 'readme.md'
var PackageJson = 'package.json'

async function createReadme() {
  var packageDir = this

  // are we in a package dir? if not, bail
  var packagePath = packageDir.to(PackageJson)
  if (!await packagePath[Exists]())
    return

  // get package scope
  var scopePath = await packageDir[ResolveNpmScope]()
  if (scopePath)
    var scope = await scopePath[ReadJsonFile]()
  
  // parse 'package.json'
  var package = await packagePath[ReadJsonFile]()
  var name = parse(package.name)

  // get jsdoc documentation
  var ast = await packageDir.to(package.main)[Parse]()
  var astFunction = ast[GetFirstDocumented]()
  var info = astFunction[GetInfo]()

  // gather substitutions
  var substitutions = {
    join: (source, template, separator) 
      => source[Expand](template, expansions, separator),

    name,
    info,
    package,
    scope,
  }

  // expand!
  template[Expand](ReadmeName, TemplateName, TemplateDir, substitutions)
}

module[ExportExtension](Path.Builder, createReadme)