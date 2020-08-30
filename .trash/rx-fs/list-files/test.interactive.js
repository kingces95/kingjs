var { readline, assert,
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    IGroupedObservable: { Key },
    '-rx': { Debounce,
      '-subject': { Subject, GroupedSubject },
      '-sync': { 
        GroupBy, Regroup, Then, ThenAbandon, Take, 
        Select, SelectMany, WindowBy,
        '-static': { of }
      },
      '-fs': { Watch, ListFiles, Stat }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var debounceMs = 50
var ReappearTimeoutMs = 100
var InoModulo = 1000
var Root = Path.dot
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
  var last
  var lastTime
  
  result
    [GroupBy](o => o.path, o => o.done)
    [Subscribe]({
      [Next](o) {
        var path = o[Key].toString()
        var current = ++version

        if (!last) {
          console.log(`+ ${path}, ino: ${ino}`) 
        }
        else {
          console.log(`~ ${last} -> ${path}, ino: ${ino}`) 
        }

        last = path

        o[Subscribe]({
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
  subject
    [ListFiles](Root, (dir, o) => o
      [Take](1)
      [Watch](dir)
      [Debounce](debounceMs)
      [Select](() => i++)
    )
    [Regroup](link => {
      var path = link[Key].path
      return link
        [Select](x => ({ value: x, stat: path[Stat]() }))
        [WindowBy](x => x.stat.ino)
        [Regroup](file => file
          [Select](value => ({ value, path }))
          [Then](of({ path, done: true }))
          [ThenAbandon]()
          //[Subscribe](o => console.log(`${o.value}: ${o.path.toString()}, ${o.file}`))
          [Subscribe](trackFile(file[Key]))
        )
    })
    [SelectMany]()
    [Subscribe]()

  subject[Next]()
})