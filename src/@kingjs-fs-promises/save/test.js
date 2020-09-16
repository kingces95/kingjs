var { assert, fs: { promises: fs },
  '@kingjs': { Path,
    '-fs-promises': { Save }
  }
} = module[require('@kingjs-module/dependencies')]()

var Temp = '.temp'
var Utf8 = 'utf8'

process.nextTick(async () => {
  await fs.rmdir(Temp, { recursive: true })

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

  await Path.parse(Temp)[Save](files)

  assert.equal('Do anything.', await fs.readFile('.temp/foo/license'))
  assert.deepEqual(
    [ 'foo.js', 'license' ], 
    (await fs.readdir('.temp/bar/node_modules/foo')).sort()
  )

  assert.deepEqual({
    foo: {
      'foo.js': await fs.readFile('.temp/foo/foo.js', Utf8),
      license: `file:${await fs.readlink('.temp/foo/license', 'utf8')}`
    },
    bar: {
      'bar.js': await fs.readFile('.temp/bar/bar.js', Utf8),
      'package.json': JSON.parse(
        await fs.readFile('.temp/bar/package.json')
      ),
      'node_modules': {
        'foo': `dir:${await fs.readlink('.temp/bar/node_modules/foo', 'utf8')}`
      }
    },
    license: 'Do anything.'
  }, files)

  await fs.rmdir('.temp', { recursive: true })
})
