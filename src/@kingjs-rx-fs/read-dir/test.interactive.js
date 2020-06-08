var { readline,
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    IGroupedObservable: { Key },
    '-rx': { Debounce,
      '-subject': { Subject, GroupedSubject },
      '-sync': { GroupBy, Regroup, Then, Tap,
        '-static': { of, never }
      },
      '-fs': { Watch, ReadDir, Stat }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Ms = 100

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var last
var fileIno = 8604171652
var version = 0

class GroupedSubjectMap extends Map {
  getOrCreate(key) {
    var subject = this.get(key)
    if (!subject)
      this.set(key, subject = new GroupedSubject(key))
    return subject
  }
}

var map = new GroupedSubjectMap()
map.getOrCreate(fileIno)
  [GroupBy](o => o.path, o => !o.stats)
  [Subscribe]({
    [Next](o) {
      var path = o[Key].toString()
      var current = ++version

      if (!last) {
        console.log(`[+] ${path}, ino: ${fileIno}`) 
      }
      else {
        console.log(`[o] ${last} -> ${path}, ino: ${fileIno}`) 
      }

      last = path

      o[Subscribe]({
        [Next](x) {
          console.log(`[Δ] ${x.path}, ino: ${fileIno}`) 
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

var subject = new Subject()
rl.on('SIGINT', () => {
  console.log('ctrl-c')
  subject[Complete]()
  rl.close()
})

function diff(subject) {

}

var dir = Path.dot
process.nextTick(async () =>
  subject
    [Watch](dir)
    [Debounce](Ms)
    [ReadDir](dir)
    [Regroup](o => o
      [Stat](dir)
      [Regroup](x => x
        [Tap](y => y
          [Then](of({ path: dir.to(o[Key]) }))
          [Then](never())
          [Subscribe](map.getOrCreate(x[Key]))
        )
      )
    )

    // subscribe to watcher
    [Subscribe]({
      [Complete]() { 
        console.log('watcher stopped')
      },
      [Next](p) { 
        var name = p[Key]
        console.log(`+ ${name}`)

        // subscribe to path
        p[Subscribe]({
          [Complete]() { 
            console.log(`- ${name}`)
          },
          [Next](l) {
            var ino = l[Key]
            console.log(`+ ${name} -> ${ino}`)

            // subscribe to link 
            l[Subscribe]({
              [Next](x) { 
                console.log(`Δ ${x.name}, ino: ${x.stats.ino}, time: ${x.stats.ctimeMs}`)
              },
              [Complete]() { 
                console.log(`- ${name} -> ${ino}`) 
              }
            })
          }
        })
      }
    }
  )
)