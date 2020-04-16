var assert = require('assert')
var { promises: fs } = require('fs')
var Path = require('@kingjs/path.builder')
var Save = require('..')

var Acme = 'acme'
var FooJs = 'foo.js'
var BarJs = 'bar.js'
var PackageJson = 'package.json'
var NodeModules = 'node_modules'
var IndexJs = 'index.js'
var Utf8 = 'utf8'

async function run() {
  var files = {
    [FooJs]: "var assert = require('assert')",
    bar: {
      [BarJs]: "var path = require('path')",
      [PackageJson]: {
        name: 'bar'
      },
      [NodeModules]: {
        'bar.baz': {
          [PackageJson]: { name: 'bar.baz' }
        }
      }
    }
  }

  await Path.Relative.to(Acme)[Save](files)

  assert.deepEqual({
    [FooJs]: await fs.readFile('acme/foo.js', Utf8),
    bar: {
      [BarJs]: await fs.readFile('acme/bar/bar.js', Utf8),
      [PackageJson]: JSON.parse(
        await fs.readFile('acme/bar/package.json')
      ),
      [NodeModules]: {
        'bar.baz': {
          [PackageJson]: { name: 'bar.baz' }
        }
      }
    }
  }, files)

  await fs.rmdir(Acme, { recursive: true })
}
run().catch(o => console.log(o))