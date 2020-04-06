var assert = require('assert')
var { promises: fs } = require('fs')
var writeFiles = require('..')

var Acme = 'acme'
var FooJs = 'foo.js'
var BarJs = 'bar.js'
var PackageJson = 'package.json'
var Utf8 = 'utf8'

async function run() {
  var files = {
    [FooJs]: "var assert = require('assert')",
    bar: {
      [BarJs]: "var path = require('path')",
      [PackageJson]: {
        name: 'bar'
      }
    }
  }

  await writeFiles(Acme, files)

  assert.deepEqual({
    [FooJs]: await fs.readFile('acme/foo.js', Utf8),
    bar: {
      [BarJs]: await fs.readFile('acme/bar/bar.js', Utf8),
      [PackageJson]: JSON.parse(
        await fs.readFile('acme/bar/package.json')
      )
    }
  }, files)

  await fs.rmdir(Acme, { recursive: true })
}
run().catch(o => console.log(o))