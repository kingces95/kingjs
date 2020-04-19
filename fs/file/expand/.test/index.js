var assert = require('assert')
var Expand = require('..')
var Path = require('@kingjs/path.builder')
var Save = require('@kingjs/fs.promises.save')
var Read = require('@kingjs/fs.file.read')
var ExpandArray = require('@kingjs/array.expand')
var ToPairs = require('@kingjs/pojo.to-pairs')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')
var Probe = require('@kingjs/fs.probe')

async function run() {
  var acme = Path.parse('acme')
  await acme[RemoveDir]()

  await acme[Save]({
    foo: {
      '.md': {
        'x.txt': 'local x.txt',
        'x.t.md': 'local',
        'readme.t.md': 
          "${hello} ${world}!\n" +
          "${include('x.txt')}\n" +
          "${include('y.txt')}\n" +
          "${include('z.txt') || 'no z.txt'}\n" +
          "${expand('y.t.md')}\n" +
          "${join('${key}${colon}${value}', fruit, ', ')}"
      },
    },
    '.md': {
      'x.txt': "global x.txt",
      'y.txt': "global y.txt",
      'x.t.md': "global",
      'y.t.md': "global, ${expand('x.t.md')}",
    },
  })

  var substitutions = { 
    hello: 'Hello',
    world: 'World',
    colon: ':',
    fruit: { first: 'apple', second: 'orange' },
    join: (template, source, separator) => source
      [ToPairs]()
      [ExpandArray](template, substitutions, separator)
  }

  var foo = acme.to('foo')

  foo[Expand]('readme.md', 'readme.t.md', '.md', substitutions)

  var result = foo.to('readme.md')[Read]('utf8')

  assert.equal(result, 
    "Hello World!\n" +
    "local x.txt\n" +
    "global y.txt\n" +
    "no z.txt\n" +
    "global, local\n" +
    "first:apple, second:orange")

  await acme[RemoveDir]()
}
run().catch(e => console.log(e))