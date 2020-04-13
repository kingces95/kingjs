var assert = require('assert')
var Path = require('@kingjs/path.builder')
var RemoveDir = require('@kingjs/fs.promises.remove-dir')
var WriteFiles = require('@kingjs/fs.promises.write-files')
var ReadFiles = require('..')

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

  var acme = Path.Cwd.to(Acme)
  await acme[WriteFiles](expected)

  var actual = await acme[ReadFiles]()
  assert.deepEqual(expected, actual)

  await acme[RemoveDir]()
}
run().catch(o => console.log(o))