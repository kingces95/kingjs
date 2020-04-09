var assert = require('assert')
var { promises: fs } = require('fs')
var writeFiles = require('@kingjs/fs.promises.write-files')
var readFiles = require('@kingjs/fs.promises.read-files')
var createDependencies = require('..')

var Acme = 'acme'
var MyNs = 'my-ns'
var Foo = 'foo'
var Bar = 'bar'
var PackageJson = 'package.json'
var IndexJs = 'index.js'
var DependenciesJs = 'dependencies.js'
var NodeModules = 'node_modules'

var expected = `module.exports = {
  assert: require("assert"),
  "@acme": {
    Foo: require("@acme/foo")
  }
}`

async function run() {
  await writeFiles(Acme, {
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

  await createDependencies('acme/my-ns/bar')
  var { 
    [MyNs]: { 
      [Bar]: { [DependenciesJs]: dependenciesJs } 
    } 
  } = await readFiles(Acme);
  
  assert.equal(dependenciesJs, expected)

  await fs.rmdir(Acme, { recursive: true })
}
run().catch(e => console.log(e))