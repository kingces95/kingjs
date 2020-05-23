var {
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Error },
    '-rx-async-static': { create }
  }
} = module[require('@kingjs-module/dependencies')]()

process.on('uncaughtException', function(err) {  
  console.log('Caught exception:', err)
})

new create(function*(observer) {
  observer[Error]('unhandled error')
})[Subscribe]()