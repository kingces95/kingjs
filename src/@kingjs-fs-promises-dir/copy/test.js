var { assert,
  '@kingjs': { Path,
    '-fs-promises': { Save, Load,
      '-dir': { 
        Copy: CopyDir,
        Remove: RemoveDir,
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var Acme = 'acme'
var Ecma = 'ecma'
var FooJs = 'foo.js'
var BarJs = 'bar.js'

process.nextTick(async () => {

  var acme = Path.parse(Acme)
  var ecma = Path.parse(Ecma)
  await acme[RemoveDir]()
  await ecma[RemoveDir]()

  var acmeFiles = {
    [FooJs]: '// this is foo.js',
    bar: {
      [BarJs]: '// this is bar.js'
    }
  }

  await acme[Save](acmeFiles)

  // basic
  await acme[CopyDir](ecma)
  var ecmaFiles = await ecma[Load]() 
  assert.deepEqual(ecmaFiles, acmeFiles)

  // idempotent
  await acme[CopyDir](ecma)
  var ecmaFiles = await ecma[Load]() 
  assert.deepEqual(ecmaFiles, acmeFiles)

  // map
  await ecma[RemoveDir]()
  await acme[CopyDir](ecma, o => {
    var { text, name, path } = o
    if (o.isDirectory) 
      return { name: name + '_' }

    name = path.basename + '_' + path.ext
    text = text.toUpperCase()
    return { text, name, path }
  })
  var ecmaFiles = await ecma[Load]() 
  assert.deepEqual(ecmaFiles, {
    'foo_.js': '// THIS IS FOO.JS',
    'bar_': {
      'bar_.js': '// THIS IS BAR.JS'
    }
  })

  await acme[RemoveDir]()
  await ecma[RemoveDir]()
})
