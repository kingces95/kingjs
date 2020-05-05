var assert = require('assert')
var { promises: fs } = require('fs')
var Path = require('@kingjs/path')
var Save = require('..')

var Acme = 'acme'
var Utf8 = 'utf8'

async function run() {
  await fs.rmdir('acme', { recursive: true })

  var files = {
    foo: {
      'foo.js': "module.exports = 42",
      license: "file:../license"
    },
    bar: {
      'bar.js': "var foo = require('foo')",
      'package.json': {
        name: 'bar'
      },
      'node_modules': {
        'foo': "dir:../../foo"
      }
    },
    'license': 'Do anything.'
  }

  await Path.parse('acme')[Save](files)

  assert.deepEqual({
    foo: {
      'foo.js': await fs.readFile('acme/foo.js', Utf8),
    },
    bar: {
      'bar.js': await fs.readFile('acme/bar/bar.js', Utf8),
      'package.json': JSON.parse(
        await fs.readFile('acme/bar/package.json')
      ),
      'node_modules': {
        'bar.baz': {
          'package.json': { name: 'bar.baz' }
        }
      }
    }
  }, files)

  await fs.rmdir('acme', { recursive: true })
}
run().catch(o => console.log(o))