var { assert,
  '@kingjs': { 
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-rx': { Subject },
  },
} = module[require('@kingjs-module/dependencies')]()

var subject = new Subject((self) => {
  console.log('activate')
})

subject[Subscribe](o => null)
subject[Subscribe](o => null)