var assert = require('assert')
var Path = require('@kingjs/path.builder')
var Probe = require('..')
var Save = require('@kingjs/fs.promises.save')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')
var ReadJsonFile = require('@kingjs/json.file.read')
var ReadFile = require('@kingjs/fs.promises.file.read')

async function test() {
  var acme = Path.Relative.to('acme')
  await acme[Save]({
    myNs: {
      myPkg: {
        'package.json': {
          name: "@acme/myNs.myPkg"
        }
      },
    },
    'npm-scope.json': {
      name: 'acme'
    },
    '.md': {
      'readme.t.md': "#name ${pkg.name}"
    }
  })

  var myPkg = acme.to('root').to('myNs').to('myPkg')

  var npmScopePath = await myPkg[Probe]('npm-scope.json')
  var { name } = await npmScopePath[ReadJsonFile]()
  assert.equal(name, 'acme')

  var readmeTemplate = Path.Relative.to('.md').to('readme.t.md')
  var templatePath = await myPkg[Probe](readmeTemplate)
  var text = await templatePath[ReadFile]('utf8')
  assert.equal(text, "#name ${pkg.name}")

  assert(await myPkg[Probe]('no.such.file') === undefined)

  acme[RemoveDir]()
} 
test()