var assert = require('assert')
var writeFiles = require('@kingjs/fs.promises.write-files')
var resolvePackage = require('..')

var Acme = 'acme'
var MyNs = 'my-ns'
var Bar = 'bar'
var PackageJson = 'package.json'
var IndexJs = 'index.js'
var NodeModules = 'node_modules'

async function test() {
  await writeFiles(Acme, {
    [MyNs]: {
      [Bar]: {
        [IndexJs]: `// dummy file`,
        [PackageJson]: {
          dependencies: {
            "@acme/my-ns.foo": "latest"
          },
        },
        [NodeModules]: {
          '@acme': { 
            'my-ns.foo': {
              [PackageJson]: {
                capitalize: true
              },
              [IndexJs]: `module.exports = 42`,
            }
          }
        },
      }
    }
  })

  var package = await resolvePackage('@acme/my-ns.foo', 'acme/my-ns/bar')
  assert.equal("acme/my-ns/bar/node_modules/@acme/my-ns.foo/package.json", package)

  var package = await resolvePackage('@acme/my-ns.bad', 'acme/my-ns/bar')
  assert.equal(null, package)
}

test()