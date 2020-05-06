var { assert, fs: { promises: fs },
  '@kingjs': { Path,
    '-fs-promises': { Save }
  }
} = module[require('@kingjs-module/dependencies')]()

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
    license: 'Do anything.'
  }

  await Path.parse('acme')[Save](files)

  assert.equal('Do anything.', await fs.readFile('acme/foo/license'))
  assert.deepEqual(
    [ 'foo.js', 'license' ], 
    (await fs.readdir('acme/bar/node_modules/foo')).sort()
  )

  assert.deepEqual({
    foo: {
      'foo.js': await fs.readFile('acme/foo/foo.js', Utf8),
      license: `file:${await fs.readlink('acme/foo/license', 'utf8')}`
    },
    bar: {
      'bar.js': await fs.readFile('acme/bar/bar.js', Utf8),
      'package.json': JSON.parse(
        await fs.readFile('acme/bar/package.json')
      ),
      'node_modules': {
        'foo': `dir:${await fs.readlink('acme/bar/node_modules/foo', 'utf8')}`
      }
    },
    license: 'Do anything.'
  }, files)

  await fs.rmdir('acme', { recursive: true })
}
run().catch(o => console.log(o))