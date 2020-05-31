var { readline,
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    IGroupedObservable: { Key },
    '-rx': { Debounce,
      '-subject': { Subject, GroupedSubject },
      '-observer': { Proxy },
      '-sync': { GroupBy, Regroup, Do },
      '-fs': { Watch, ReadDir, Stat }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Ms = 100

class GroupedSubjectMap extends Map {
  getOrCreate(key) {
    var subject = this.get(key)
    if (!subject)
      this.set(key, subject = new GroupedSubject(key))
    return subject
  }
}
var map = new GroupedSubjectMap()

var last
var fileIno = 8604171652
map.getOrCreate(fileIno)
  [GroupBy](o => o.path, o => !o.stats)
  [Subscribe]({
    [Next](o) {
      var path = o[Key].toString()

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
          console.log(`[-] ${path}`)
        }
      })
    }
  })

var dir = Path.dot
var subject = new Subject()

process.nextTick(async () =>
  subject
    [Watch](dir)
    [Debounce](Ms)
    [ReadDir](dir)
    [Regroup](o => o
      [Stat](dir)
      [Regroup](x => x

        // simulcast the `Dirent`s to a subject
        [Do](map.getOrCreate(x[Key].ino)[Proxy]({
          [Complete]() { 
            this[Next]({ 
              path: dir.to(x[Key].name) 
            })
          }
        }))
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
            var ino = l[Key].ino
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

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('SIGINT', () => {
  console.log('ctrl-c')
  subject[Complete]()
  rl.close()
})