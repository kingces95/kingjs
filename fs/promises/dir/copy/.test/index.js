var assert = require('assert')
var Path = require('@kingjs/path.builder')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')
var Save = require('@kingjs/fs.promises.save')
var Load = require('@kingjs/fs.promises.load')
var CopyDir = require('..')

var Acme = 'acme'
var Ecma = 'ecma'
var FooJs = 'foo.js'
var BarJs = 'bar.js'

async function run() {

  var acme = Path.Relative.to(Acme)
  var ecma = Path.Relative.to(Ecma)
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
}
run().catch(e => console.log(e))
