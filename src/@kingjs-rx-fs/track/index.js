var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    IGroupedObservable: { Key },
    '-rx': {
      '-subject': { GroupedSubject },
      '-sync': { GroupBy, Then, Tap, 
        '-static': { of, never, create }
      },
      '-fs': { Diff }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function track(dir) {
  return create(observer => {
    var map = new Map()

    function emit(subject) {
      var key = subject[Key]
      var observable = subject
        [GroupBy](o => o.path, o => !o.stats)
      observable[Key] = key
      observer[Next](observable)
    }

    function getOrCreate(key) {
      var subject = map.get(key)
      if (!subject) {
        map.set(key, subject = new GroupedSubject(key))
        emit(subject)
      }
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

module[ExportExtension](IObservable, track)