var { assert,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
  }
} = module[require('@kingjs-module/dependencies')]()

class ObserverThunk {
  set(observer) { 
    assert(!this.observer)
    this.observer = observer 
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

module.exports = ObserverThunk
