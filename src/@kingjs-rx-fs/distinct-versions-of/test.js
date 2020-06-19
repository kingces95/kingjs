var {
  '@kingjs': {
    IGroupedObservable: { Subscribe, Key },
    Path,
    '-fs': { Exists,
      '-dir': { Make, Remove },
      '-file': { Write, Unlink },
    },
    '-rx': { 
      '-sync': { SubscribeAndAssert, Materialize, Do, Take, Select, GroupBy, Regroup, Rekey,
        '-static': { of, counter },
      },
      '-fs': { DistinctVersionsOf }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var path = Path.dot
var acme = path.to('acme')
var bar = acme.to('bar')

if (acme[Exists]())
  acme[Remove]()
acme[Make]()

function execute(commands, expected) {

  counter()
    [Take](commands.length)
    [Do](o => commands[o].forEach(x => x()))
    [DistinctVersionsOf](bar)
    [Materialize]()
    [Select](o => serialize(o))
    //[Subscribe](o => console.log(o))
    [SubscribeAndAssert](expected)
}

execute([
  [() => bar[Make]()],
  [],
  [() => bar[Make]()],
], [ '+i', 'Δi0', '-i', '-'])
bar[Remove]()

execute([
  [() => bar[Write]()],
  [() => bar[Write]()],
  []
], [ '+i', 'Δi0', 'Δi1', '-i', '-'])
bar[Unlink]()

execute([
  [() => bar[Make]()],
  [() => bar[Remove](), () => bar[Write]()],
], [ '+i', 'Δi0', '-i', '+i', 'Δi1', '-i', '-' ])
acme[Remove]()

function serialize(o) {
  var result = ''
  if (o.grouping) result += '+'
  if (o.complete) result +=  '-'
  if (o.next) result +=  'Δ'

  if (o.keys)
    result += 'i'

  if (o.next) result += o.value
  return result
}