var { assert,
  '@kingjs': { Path,
    '-fs-promises': { Save, Load,
      '-dir': { Remove: RemoveDir }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

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

  var acme = Path.parse(Acme)
  await acme[Save](expected)

  var actual = await acme[Load]()
  assert.deepEqual(expected, actual)

  await acme[RemoveDir]()
}
run().catch(o => console.log(o))