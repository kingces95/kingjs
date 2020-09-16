var { readline, assert,
  '@kingjs': {
    IObservable, 
    IObservable: { Subscribe },
    IObserver,
    IObserver: { Next, Complete },
    '-rx': {
      '-subject': { Subject },
      '-sync': { Select, Where },
      '-path': { Materialize },
      '-fs': { Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.on('message', (m) => {
  console.log(m);
});