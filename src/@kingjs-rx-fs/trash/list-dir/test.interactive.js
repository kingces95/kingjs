var { readline, assert,
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    IGroupedObservable: { Key },
    '-rx': { Debounce,
      '-subject': { Subject, GroupedSubject },
      '-sync': { 
        GroupBy, Regroup, Then, Tap, ThenAbandon, Where, 
        Materialize, Rekey, Select, SelectMany, DistinctUntilChanged, WindowBy,
        '-static': { of }
      },
      '-fs': { Watch, ListDir, Stat }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var ReappearTimeoutMs = 100
var InoModulo = 1000
var Root = Path.dot
var Directory = 'directory'
var File = 'file'
var i = 0
var subject = new Subject(assert.fail)

class GroupedSubjectMap extends Map {
  getOrCreate(key) {
    var subject = this.get(key)
    if (!subject)
      this.set(key, subject = new GroupedSubject(key, assert.fail))
    return subject
  }
}

var map = new GroupedSubjectMap()
var trackedFiles = new Set()

function trackFile(ino) {
  ino %= InoModulo

  if (trackedFiles.has(ino))
    return map.getOrCreate(ino)

  trackedFiles.add(ino)
  var result = map.getOrCreate(ino)
  var version = 0
  var lastPath
  var lastTime
  
  result
    [GroupBy](o => o.path, o => o.done)
    [Subscribe]({
      [Next](o) {
        var path = o[Key].toString()
        var current = ++version

        if (!lastPath) {
          console.log(`+ ${path}, ino: ${ino}`) 
        }
        else {
          console.log(`~ ${lastPath} -> ${path}, ino: ${ino}`) 
        }

        lastPath = path

        o[DistinctUntilChanged](x => x.mtimeMs)
        [Subscribe]({
          [Next](x) {
            if (lastTime != x.mtimeMs)
              console.log(`Δ ${x.path}, ino: ${ino}, mtime: ${x.mtimeMs}`) 
            lastTime = x.mtimeMs
          },
          [Complete]() {
            delayDelete(current)
          }
        })

        function delayDelete(current) {
          setTimeout(() => {
            if (version == current)
              console.log(`- ${path}`)
          }, ReappearTimeoutMs)
        }
      }
    })

  return result
}

function watchDir(observable, dir) {
  return observable
    [Watch](dir)
    [Debounce](ReappearTimeoutMs)
    [Select](() => i++)
    [ListDir](dir)
    [Tap](o => o
      [Where](x => x[Key].type == Directory)
      [Subscribe](x => watchDir(x, dir.to(x[Key].name)))
    )
    [Where](o => o[Key].type == File)
    [Rekey](o => o.name)
    [Regroup](link => {
      var path = dir.to(link[Key])
      return link
        [Stat](path)
        [WindowBy](x => x.stat.ino)
        [Regroup](file => file
          [Select](o => ({ value: o.value, mtimeMs: o.stat.mtimeMs, path }))
          [Then](of({ path, done: true }))
          [ThenAbandon]()
          //[Subscribe](o => console.log(`${o.value}: ${o.path.toString()}, ${o.file}`))
          [Subscribe](trackFile(file[Key]))
        )
    })
    [SelectMany]()
    [Subscribe]()
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('SIGINT', () => {
  console.log('ctrl-c')
  subject[Complete]()
  rl.close()
})

process.nextTick(async () => {
  watchDir(subject, Root)
  subject[Next]()
})




    // subscribe to watcher
    // [Subscribe]({
    //   [Complete]() { 
    //     console.log('watcher stopped')
    //   },
    //   [Next](p) { 
    //     var name = p[Key]
    //     console.log(`+ ${name}`)

    //     // subscribe to path
    //     p[Subscribe]({
    //       [Complete]() { 
    //         console.log(`- ${name}`)
    //       },
    //       [Next](l) {
    //         var ino = l[Key]
    //         console.log(`+ ${name} -> ${ino}`)

    //         // subscribe to link 
    //         l[Subscribe]({
    //           [Next](x) { 
    //             console.log(`Δ ${x.name}, ino: ${x.stats.ino}, time: ${x.stats.mtimeMs}`)
    //           },
    //           [Complete]() { 
    //             console.log(`- ${name} -> ${ino}`) 
    //           }
    //         })
    //       }
    //     })
    //   }
    // }
    //)