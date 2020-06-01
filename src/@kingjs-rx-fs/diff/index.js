var {
  '@kingjs': {
    IObservable,
    '-rx': {
      '-sync': { Regroup },
      '-fs': { ReadDir, Stat }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function diff(dir) {
  return this
    [ReadDir](dir)
    [Regroup](o => o
      [Stat](dir)
    )
}

module[ExportExtension](IObservable, diff)