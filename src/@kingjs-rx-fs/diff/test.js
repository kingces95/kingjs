var { readline,
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    IGroupedObservable: { Key },
    '-rx': { Debounce,
      '-subject': { Subject },
      '-fs': { Watch, Track }
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

var dir = Path.dot
process.nextTick(async () =>
  subject
    [Watch](dir)
    [Debounce](Ms)
    [Track](dir)
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
              console.log(`+ ${path}, ino: ${ino}`) 
            }
            else {
              console.log(`o ${last} -> ${path}, ino: ${ino}`) 
            }
    
            last = path
    
            p[Subscribe]({
              [Next](x) {
                console.log(`Δ ${x.path}, ino: ${ino}, time: ${x.stats.ctimeMs}`) 
              },
              [Complete]() {
                delayDelete(current)
              }
            })

            function delayDelete(current) {
              setTimeout(() => {
                if (version == current)
                  console.log(`- ${path}`)
              }, Ms)
            }
          }
        })
      }
    })
)