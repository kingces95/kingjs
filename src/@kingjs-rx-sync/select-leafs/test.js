var {
  '@kingjs': { Path,
    '-fs': { 
      '-dir': { List },
      '-file': { Read },
      '-promises': { Save }
    },
    '-rx': { 
      '-sync': { SelectLeafs, SubscribeAndAssert, Materialize, Select,
        '-static': { of, from, throws, never },
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var tree = [
  [ 0, [
    [ 1, 2 ], 3
  ]]
]

from(tree)
  [SelectLeafs](o => o instanceof Array ? from(o) : null)
  [SubscribeAndAssert]([0, 1, 2, 3])

from(tree)
  [SelectLeafs](o => o instanceof Array ? from(o) : null)
  [SubscribeAndAssert]([0], { terminate: true })

from(tree)
  [SelectLeafs](o => o instanceof Array ? from(o) : null)
  [SubscribeAndAssert]([0, 1, 2, 3], { terminate: true })

throws('error')
  [SelectLeafs](o => o instanceof Array ? from(o) : null)
  [SubscribeAndAssert](null, { error: 'error' })

process.nextTick(async () => {
  var dot = Path.dot
  var acme = dot.to('acme')
  await acme[Save]({
    ['foo']: {
      ['bar']: {
        ['bar.txt']: 'bar'
      },
      ['foo.txt']: 'foo',
    },
    ['root.txt']: 'root',
  })

  var options = { withFileTypes: true }
  var utf8 = 'utf8'

  from(acme[List](options))
    [SelectLeafs](o => o.isDirectory ?
       from(o.path[List](options)) : null 
    )
    [Select](
      o => o.path[Read](utf8)
    )
    [SubscribeAndAssert](['bar', 'foo', 'root'])
})