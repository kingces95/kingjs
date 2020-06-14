var {
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    '-fs': {
      '-dir': { Make, Remove },
      '-file': { Write, Unlink },
    },
    '-rx': { 
      '-sync': { SubscribeAndAssert, Materialize, Do, Take, Select,
        '-static': { of, counter },
      },
      '-fs': { ReadDir }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var path = Path.dot
var acme = path.to('acme')
var bar = acme.to('bar')
var foo = acme.to('foo')

acme[Make]()

function execute(commands, expected) {

  counter()
    [Take](commands.length)
    [Do](o => commands[o].forEach(x => x()))
    [ReadDir](acme)
    [Materialize]()
    [Select](o => serialize(o))
    //[Subscribe](o => process.stdout.write(`'${o}', `))
    [SubscribeAndAssert](expected)
}

execute([
  [() => bar[Make]()],
  [() => bar[Remove]()]
], [ '+d', '+db', 'Δdb0', '-db', '-d', '-'])

execute([
  [() => bar[Write]()],
  [() => bar[Unlink]()]
], [ '+f', '+fb', 'Δfb0', '-fb', '-f', '-'])

execute([
  [() => bar[Write]()],
  [],
  [() => bar[Unlink]()]
], [ '+f', '+fb', 'Δfb0', 'Δfb1', '-fb', '-f', '-'])

execute([
  [() => bar[Make]()],
  [() => bar[Remove](), () => bar[Write]()],
  [() => bar[Unlink]()]
], [ '+d', '+db', 'Δdb0', '-db', '+f', '+fb', 'Δfb1', '-fb', '-d', '-f', '-' ])

acme[Remove]()

function serialize(o) {
  var result = ''
  if (o.grouping) result += '+'
  if (o.complete) result +=  '-'
  if (o.next) result +=  'Δ'

  var keys = o.keys || []
  keys = keys.map(o => o[0])
  result += keys.join('')
  if (o.next) result += o.value
  return result
}