var assert = require('assert')
var Path = require('@kingjs/path')
var Find = require('..')
var Save = require('@kingjs/fs.promises.save')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')

async function test() {
  var acme = Path.parse('acme')
  await acme[Save]({
    myNs: {
      myPkg: {
        'package.json': { }
      },
    },
  })

  var expected = acme.to('myNs').to('myPkg').to('package.json')

  var result = []
  for await (var path of acme[Find]('package.json'))
    result.push(path)

  assert.ok(result.length == 1)
  var actual = result.pop()
  assert.ok(actual.equals(expected))

  acme[RemoveDir]()
} 
test()