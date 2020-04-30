var assert = require('assert')
var Path = require('@kingjs/path')
var Poset = require('..')
var Save = require('@kingjs/fs.promises.save')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')

async function test() {
  var acme = Path.parse('acme')
  await acme[Save]({
    'a': {
      'package.json': {
        name: "a"
      }
    },
    'b': {
      'package.json': {
        name: "b",
        dependencies: { 
          'a': 'latest' 
        }
      }
    },
    'c': {
      'package.json': {
        name: "c",
        dependencies: { 
          'a': 'latest' 
        }
      }
    },
    'd': {
      'package.json': {
        name: "d",
        dependencies: { 
          'b': 'latest',
          'c': 'latest',
        }
      }
    },
  })

  var myPkg = acme.to('root').to('my-ns').to('my-pkg')
  var myDepPkg = acme.to('root').to('my-dep-pkg')

  var poset = await acme[Poset]()

  console.log(poset)

  acme[RemoveDir]()
} 
test()