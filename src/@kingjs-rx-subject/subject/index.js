var { assert,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    IObservable: { Subscribe }
  }
} = module[require('@kingjs-module/dependencies')]()

var Noop = () => null

class Subject {

  [Subscribe](observer) { 
    assert(!this.observer)
    this.observer = observer 
    return Noop
  }

  [Next](o) { 
    if (this.observer) 
      this.observer[Next](o) 
  }
  [Complete]() { 
    if (this.observer) 
      this.observer[Complete]() 
  }
  [Error](e) { 
    if (this.observer) 
      this.observer[Error](e) 
  }
}

module.exports = Subject