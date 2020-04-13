var assert = require('assert')
var { promises: fs } = require('fs')
var writeFiles = require('@kingjs/fs.promises.write-files')
var expand = require('..')

async function run() {
  await writeFiles('acme', {
    'foo.md': 
      "${hello} ${world}!\n" +
      "dir/bar.md exists = ${exists('dir/bar.md')}\n" +
      "${expand('dir/baz.md')}\n" +
      "${join('${key}${colon}${value}', fruit, ', ')}",
    'dir': {
      'bar.md': 
        "${hello} from bar.md!",
      'baz.md':
        "${include('bar.md')}\n" +
        "${expand('bar.md')}",
    },
  })

  var substitutions = { 
    hello: 'Hello',
    world: 'World',
    colon: ':',
    fruit: { first: 'apple', second: 'orange' }
  }

  var result = expand('acme/foo.md', substitutions)

  assert.equal(result, 
    "Hello World!\n" +
    "dir/bar.md exists = true\n" +
    "${hello} from bar.md!\n" +
    "Hello from bar.md!\n" +
    "first:apple, second:orange")

  await fs.rmdir('acme', { recursive: true })
}
run().catch(e => console.log(e))