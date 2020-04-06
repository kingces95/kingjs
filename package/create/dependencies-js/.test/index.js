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

var expected = `module.exports = {
  assert: require("assert"),
  "@acme": {
    myNs: {
      foo: require("@acme/my-ns.foo")
    }
  }
}`

async function run() {
  await writeFiles(Acme, {
    [MyNs]: {
      [Foo]: {
        [IndexJs]: `module.exports = 42`,
      },
      [Bar]: {
        [PackageJson]: {
          dependencies: {
            "@acme/my-ns.foo": "file:../foo"
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