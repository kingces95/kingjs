var assert = require('assert')
var { promises: fs } = require('fs')
var writeFiles = require('@kingjs/fs.promises.write-files')
var readFiles = require('..')

var Acme = 'acme'
var FooJs = 'foo.js'
var BarJs = 'bar.js'
var PackageJson = 'package.json'

async function run() {
  var expected = {
    [FooJs]: "var assert = require('assert')",
    bar: {
      [BarJs]: "var path = require('path')",
      [PackageJson]: {
        name: 'bar'
      }
    }
  }

  await writeFiles(Acme, expected)

  var actual = await readFiles(Acme)
  assert.deepEqual(expected, actual)

  await fs.rmdir(Acme, { recursive: true })
}
run().catch(o => console.log(o))