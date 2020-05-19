var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx-sync-static': { create }
  }
} = module[require('@kingjs-module/dependencies')]()

class DataSource {
  constructor() {
    let i = 0
    this.id = setInterval(() => this.emit(i++), 200)
  }
  
  emit(n) {
    const limit = 10
    if (this.onData) {
      this.onData(n)
    }
    if (n === limit) {
      if (this.oncomplete) {
        this.onComplete()
      }
      this.destroy()
    }
  }
  
  destroy() {
    console.log('destroy')
    clearInterval(this.id)
  }
}

var myObservable = create((observer) => {
  const dataSource = new DataSource()
  dataSource.onData = (e) => observer[Next](e)
  dataSource.onError = (err) => observer[Error](err)
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
}, 1000)