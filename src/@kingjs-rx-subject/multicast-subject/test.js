var { assert,
  '@kingjs': { 
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': { Subject },
  },
} = module[require('@kingjs-module/dependencies')]()

var IntervalMs = 200
var Timeout = 1000
var Limit = 10

class DataSource {
  constructor() {
    let i = 0
    this.token = setInterval(() => this.emit(i++), IntervalMs)
  }
  
  emit(n) {
    if (this.onData) {
      this.onData(n)
    }
    
    if (n === Limit) {
      if (this.oncomplete) {
        this.onComplete()
      }
      this.destroy()
    }
  }
  
  destroy() {
    console.log('destroy')
    clearInterval(this.token)
  }
}

var myObservable = new Subject((observer) => {
  const dataSource = new DataSource()
  dataSource.onData = (o) => observer[Next](o)
  dataSource.onError = (e) => observer[Error](e)
  dataSource.onComplete = () => observer[Complete]()

  return dataSource.destroy.bind(dataSource)
})

var dispose = myObservable[Subscribe]({
  [Next](x) { console.log(x) },
  [Error](err) { console.error(err) },
  [Complete]() { console.log('done')}
})

setTimeout(() => {
  console.log('timeout')
  dispose()
}, Timeout)