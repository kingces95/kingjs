var assert = require('assert')
var Path = require('@kingjs/path')
var Find = require('..')
var Save = require('@kingjs/fs.promises.save')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')

async function test() {
  var acme = Path.parse('acme')
  await acme[Save]({
    'my-ns': {
      'my-pkg': {
        'package.json': {
          name: "@acme/my-ns.my-pkg"
        }
      },
    },
    'my-dep-pkg': {
      'package.json': {
        name: "@acme/my-dep-pkg",
        dependencies: {
          '@acme/my-ns.my-pkg': 'latest'
        }
      }
    },
  })

  var myPkg = acme.to('my-ns').to('my-pkg').to('package.json')
  var myDepPkg = acme.to('my-dep-pkg').to('package.json')

  var packages = await acme[Find]()
  assert.equal(packages.length, 2)
  assert(packages[0].equals(myDepPkg))
  assert(packages[1].equals(myPkg))

  acme[RemoveDir]()
} 
test()