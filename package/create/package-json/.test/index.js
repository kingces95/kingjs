var assert = require('assert')
var { promises: fs } = require('fs')
var writeFiles = require('@kingjs/fs.promises.file.write')
var readFiles = require('@kingjs/fs.promises.file.read')
var createPackageJson = require('..')

var Acme = 'acme'
var MyNs = 'my-ns'
var Foo = 'foo'
var Bar = 'bar'
var PackageJson = 'package.json'
var NpmScopeJson = 'npm-scope.json'
var IndexJs = 'index.js'
var indexJs = `
var {
  assert,
  ['@acme']: {
    myNs: {
      foo: a
    }
  }
} = require('./dependencies')

/**
 * @description A description of the package B.
 */
function b() { 
  return a()
}

module.exports = b`

async function run() {
  await writeFiles(Acme, {
    [MyNs]: {
      [Foo]: {
        [IndexJs]: `module.exports = 42`,
      },
      [Bar]: {
        [IndexJs]: indexJs
      }
    },
    [NpmScopeJson]: {
      "name": "acme",
      "main": "index.js",
      "files": [ "*.js" ],
      "repository": {
        "url": "https://repository.kingjs.net/",
        "type": "git"
      },
      "license": "MIT"
    }
  })

  await createPackageJson('acme/my-ns/bar')

  var {
    [MyNs]: {
      [Bar]: {
        [PackageJson]: packageJson
      }
    }
  } = await readFiles(Acme)

  assert.deepEqual({
    name: "@acme/my-ns.bar",
    main: "index.js",
    files: ['*.js'],
    description: "A description of the package B.",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://repository.kingjs.net/my-ns/bar"
    },
    dependencies: {
      "@acme/my-ns.foo": "file:../foo"
    },
    nodeDependencies: [
      "assert"
    ]
  }, packageJson)

  await fs.rmdir(Acme, { recursive: true })
}
run().catch(e => console.log(e))
