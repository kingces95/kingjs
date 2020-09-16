var { readline, yargs,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-string': { reflector },
    '-array': { ToFlags },
    '-rx': {
      '-subject': { Subject },
      '-sync': { Select, Where, Log },
      '-path': { Materialize },
      '-fs': { Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var { 
  Plain, Json, Human, Raw,
  Type, Debounce, Events,
  Found, Lost, Move, Change 
} = reflector({ decapitalize: true })

var { 
  argv: { _: [ name ] }, argv: {
    type, debounce, events
  } 
} = yargs
  .usage("Usage: <filename>")
  .option(Type, {
    alias: 't',
    default: Json,
    choices: [Plain, Json, Human, Raw],
    description: 'Output type.'
  })
  .option(Events, {
    alias: 'e',
    default: [Found, Lost, Move, Change],
    type: 'array',
    choices: [Found, Lost, Move, Change],
    description: 'Events to report.'
  })
  .option(Debounce, {
    alias: 'd',
    default: 100,
    description: 'Debounce time in milliseconds.'
  })

var { found, lost, move, change } = events[ToFlags]()
var { human, plain, json } = [type][ToFlags]()

class Event {
  constructor(o) {
    for (var key in o)
      this[key] = o[key]

    delete this.value
    delete this.id
  }
}

var subject = new Subject()

subject
  [Watch]({ debounce })
  [Materialize]()
  [Where](o => found || !o.found)
  [Where](o => lost || !o.lost)
  [Where](o => move || !o.move)
  [Where](o => change || !o.change)
  [Select](o => human ? o.toString() : o)
  [Select](o => plain ? o.path.toString() : o)
  [Select](o => json ? JSON.stringify(new Event(o)) : o)
  [Log]()
  [Subscribe]()

subject[Next]()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('SIGINT', () => {
  subject[Complete]()
  rl.close()
})