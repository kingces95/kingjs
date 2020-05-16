var {
  '@kingjs': { IObservable,
    '-module': { ExportShim },
    '-rx': { from },
  },
} = module[require('@kingjs-module/dependencies')]()

module[ExportShim](IObservable, Array, {
  subscribe() {
    var observable = from(this)
    return observable[IObservable.Subscribe]
      .apply(observable, arguments)
  }
})