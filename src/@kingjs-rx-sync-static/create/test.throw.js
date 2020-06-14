var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Subscribed, Error },
    '-rx-sync-static': { create }
  }
} = module[require('@kingjs-module/dependencies')]()

process.on('uncaughtException', function(err) {  
  console.log('Detected expected unhandled exception:', err)
})

new create((observer) => {
  observer[Subscribed](assert.fail)
  observer[Error]('test missing error handler')
})[Subscribe]()