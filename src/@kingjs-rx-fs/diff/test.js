var { readline,
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    IGroupedObservable: { Key },
    '-rx': { Debounce,
      '-subject': { Subject },
      '-sync': { GroupBy, Then, Tap, 
        '-static': { of, never, create }
      },
      '-fs': { Watch, Diff }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Ms = 100
var subject = new Subject()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('SIGINT', () => {
  console.log('ctrl-c')
  subject[Complete]()
  rl.close()
})

function track(dir) {
  return create(observer => {
    var map = new Map()

    function create(key) {
      var subject = new Subject()
      var observable = subject
        [GroupBy](o => o.path, o => !o.stats)
      observable[Key] = key
      observer[Next](observable)
      return subject
    }

    function getOrCreate(key) {
      var subject = map.get(key)
      if (!subject) 
        map.set(key, subject = create(key))
      return subject
    }
    
    return this
      [Diff](dir)
      [Subscribe](path => path
        [Subscribe](link => link
          [Tap](tap => tap
            [Then](of({ path: dir.to(path[Key]) }))
            [Then](never())
            [Subscribe](getOrCreate(link[Key]))
          )
          [Subscribe]()
        )
      )
  })
}

var dir = Path.dot
process.nextTick(async () =>
  track.call(subject
    [Watch](dir)
    [Debounce](Ms), 
  dir)
    [Subscribe]({
      [Next](o) {
        var ino = o[Key]
        var last
        var version = 0

        o[Subscribe]({
          [Next](p) {

            var path = p[Key].toString()
            var current = ++version
    
            if (!last) {
              console.log(`[+] ${path}, ino: ${ino}`) 
            }
            else {
              console.log(`[o] ${last} -> ${path}, ino: ${ino}`) 
            }
    
            last = path
    
            p[Subscribe]({
              [Next](x) {
                console.log(`[Δ] ${x.path}, ino: ${ino}, time: ${x.stats.ctimeMs}`) 
              },
              [Complete]() {
                delayDelete(current)
              }
            })

            function delayDelete(current) {
              setTimeout(() => {
                if (version == current)
                  console.log(`[-] ${path}`)
              }, Ms)
            }
          }
        })
      }
    })
)