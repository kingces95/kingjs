var {
  fs, path,
  '@kingjs': { 
    fs: { expand },
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
} = require('./dependencies')

var NpmPackageUrl = 'https://www.npmjs.com/package/'
var TemplateDir = '.md'
var TemplateName = './README.t.md'
var ReadmeName = 'README.md'
var PackageJson = 'package.json'

async function createReadme(packageDir) {

  // parse package.json
  var packageJson = require(joinPath(packageDir, PackageJson))

  // parse package name
  var { namespaces, segments } = parse(packageJson.name)

  // gather substitutions
  var substitutions = {
    npmjs: NpmPackageUrl, 

    // parse index.js
    info: (await parseSource(main))
      [GetFirstDocumented]()
      [GetInfo](),

    // package.json
    pkg: packageJson,

    namespaces, segments,
  }

  // find template
  var templatePath = 'nyi'

  // expand
  var result = expand(templatePath, substitutions)
  var readmePath = joinPath(packageDir, ReadmeName)
  fs.writeFileSync(readmePath, result)
}

module.exports = createReadme