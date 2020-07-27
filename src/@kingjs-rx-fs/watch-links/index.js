var { assert, 
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    IEquatable: { Equals, GetHashcode },
    '-dir-entry': { DirEntry: { Dir } },
    '-rx': { Debounce,
      '-subject': { Subject },
      '-sync': { WatchTree },
      '-fs': { Watch },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Noop = () => null

var DebounceMs = 100
var CreateSubject = new Subject(Noop)

class State {
  static create(dirEntry) {
    return new State(dirEntry.stat())
  }

  constructor(stat) {
    this.ino = stat.ino
    this.mtimeMs = stat.mtimeMs
  }

  [Equals](o) {
    return o instanceof State && 
      this.ino == o.ino && 
      this.mtimeMs == o.mtimeMs
  }
  [GetHashcode]() {
    return this.ino ^ this.mtimeMs
  }
}

function watchLinks(dir = Dir.dot, options = EmptyObject) {
  var { 
    debounceMs = DebounceMs,
    selectWatcher = () => CreateSubject,
    selectState = State.create
  } = options

  return this
    [WatchTree](dir, {
      selectState,
      isLeaf: o => !o.isDirectory,
      selectChildren: dir => dir.list(),
      selectWatcher: o => selectWatcher(o)
        [Watch](o.path)
        [Debounce](debounceMs),
    })
}

module[ExportInterfaceExtension](IObservable, watchLinks)