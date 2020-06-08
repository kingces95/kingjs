var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Initialize, Error },
    '-rx-sync-static': { create }
  }
} = module[require('@kingjs-module/dependencies')]()

process.on('uncaughtException', function(err) {  
  console.log('Detected expected unhandled exception:', err)
})

new create((observer) => {
  observer[Initialize](assert.fail)
  observer[Error]('test missing error handler')
})[Subscribe]()