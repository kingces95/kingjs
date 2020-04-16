var assert = require('assert')
var Path = require('@kingjs/path.builder')
var Save = require('@kingjs/fs.promises.save')
var Load = require('@kingjs/fs.promises.load')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')
var CreateDependencies = require('..')

var Acme = 'acme'
var MyNs = 'my-ns'
var Foo = 'foo'
var Bar = 'bar'
var PackageJson = 'package.json'
var IndexJs = 'index.js'
var DependenciesJs = 'dependencies.js'

var expected = `module.exports = {
  assert: require("assert"),
  "@acme": {
    Foo: require("@acme/foo")
  }
}`

async function run() {
  var acme = Path.Relative.to(Acme)
  await acme[Save]({
    [Foo]: {
      [PackageJson]: {
        capitalize: true
      },
      [IndexJs]: `module.exports = 42`,
    },
    [MyNs]: {
      [Bar]: {
        [IndexJs]: `var { '@acme': { Foo } } = require('dependencies.js')`,
        [PackageJson]: {
          capitalize: true, 
          dependencies: {
            "@acme/foo": "file:../../foo"
          },
          nodeDependencies: [
            "assert"
          ]
        },
      }
    }
  })

  await acme.to(MyNs).to(Bar)[CreateDependencies]()

  var { 
    [MyNs]: { 
      [Bar]: { 
        [DependenciesJs]: dependenciesJs 
      } 
    } 
  } = await acme[Load]()
  
  assert.equal(dependenciesJs, expected)

  await acme[RemoveDir]()
}
run().catch(e => console.log(e))