var assert = require('assert')
var Path = require('@kingjs/path.builder')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')
var WriteFiles = require('@kingjs/fs.promises.file.write')
var ReadFiles = require('@kingjs/fs.promises.file.read')
var CopyDir = require('..')

var Acme = 'acme'
var Ecma = 'ecma'
var FooJs = 'foo.js'
var BarJs = 'bar.js'

async function run() {

  var acme = Path.Cwd.to(Acme)
  var ecma = Path.Cwd.to(Ecma)
  await acme[RemoveDir]()
  await ecma[RemoveDir]()

  var acmeFiles = {
    [FooJs]: '// this is foo.js',
    bar: {
      [BarJs]: '// this is bar.js'
    }
  }

  await acme[WriteFiles](acmeFiles)

  // basic
  await acme[CopyDir](ecma)
  var ecmaFiles = await ecma[ReadFiles]() 
  assert.deepEqual(ecmaFiles, acmeFiles)

  // idempotent
  await acme[CopyDir](ecma)
  var ecmaFiles = await ecma[ReadFiles]() 
  assert.deepEqual(ecmaFiles, acmeFiles)

  // map
  await ecma[RemoveDir]()
  await acme[CopyDir](ecma, o => {
    var { text, name, path } = o
    name = path.basename + '_' + path.ext
    if (o.isDirectory) 
      return { name }

    text = text.toUpperCase()
    return { text, name, path }
  })
  var ecmaFiles = await ecma[ReadFiles]() 
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
