var { fs, fs: { promises: fsp }, 
  deepEquals,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    IObservable: { Subscribe },
    '-rx': { 
      '-async': { Latest }, 
      '-sync': { DistinctUntilChanged, Where,
        '-static': { create }
      }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function linkEqual(l, r) {
  if (!l.path.equal(r.path))
    return false

  return deepEquals(l.stats, r.stats)
}

class Links {
  constructor() {
    this.map = new Map()
  }

  activate(ino) {
    return create(observer => {
      this.map.set(ino, observer)
    })
  }

  async get(path) {
    var { ino: currentIno } = await fsp.stat(path.buffer)

    if (this.map.has(ino)) {
      var { ino, observable } = this.map.get(path)
      if (ino == currentIno)
        return observable

      observable[Complete]()
    }

    observable = stat(path)
  }
}

module[ExportExtension](IObservable, stat)