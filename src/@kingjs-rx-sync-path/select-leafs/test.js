var {
  '@kingjs': { Path,
    '-fs': { Link,
      '-dir': { Make, Remove },
      '-promises': { Save }
    },
    '-rx': { 
      '-sync': { SubscribeAndAssert, Materialize, Select,
        '-path': { SelectLeafs },
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
  var temp = dot.to('.temp')
  temp[Remove]()
  temp[Make]()

  process.chdir('.temp')
  var acme = temp.to('acme')
  await acme[Save]({
    ['foo']: {
      ['bar']: {
        ['bar.txt']: 'bar'
      },
      ['foo.txt']: 'foo',
    },
    ['root.txt']: 'root',
  })

  of(Link.dot)
    [SelectLeafs](o => {
      if (o.isDirectory)
        return from(o.list())
    })
    [Select](
      o => o.read()
    )
    [SubscribeAndAssert](['bar', 'foo', 'root'])

  process.chdir('..')
  temp[Remove]()
})