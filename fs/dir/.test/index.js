var assert = require('assert')
var { promises: fs } = require('fs')
var writeFiles = require('@kingjs/fs.promises.write-files')
var Dir = require('..')

async function run() {
  await writeFiles('acme', {
    'foo.md': 'This is foo.',
    'dir': {
      'bar.md': 'This is bar.',
      'expand.md': '${value}'
    },
  })

  var dir = new Dir('acme')
  assert.equal(dir.path, 'acme')
  assert.ok(dir.exists('foo.md'))
  assert.equal(dir.read('foo.md'), 'This is foo.')
  assert.equal(dir.expand('dir/expand.md', { value: dir}), 'acme/dir')
  
  dir.push('dir')
  assert.ok(!dir.exists('foo.md'))
  assert.ok(dir.exists('bar.md'))
  assert.equal(dir.expand('expand.md', { value: dir}), 'acme/dir')

  dir.pop()
  assert.ok(dir.exists('foo.md'))

  await fs.rmdir('acme', { recursive: true })
}
run().catch(e => console.log(e))