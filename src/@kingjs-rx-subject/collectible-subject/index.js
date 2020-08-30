var { assert,
  '@kingjs': {
    EmptyObject,
    IObserver: { Next },
    ICollectibleSubject: { IsEligible },
    '-rx-subject': { Subject },
  }
} = module[require('@kingjs-module/dependencies')]()

var Count = 0
var False = () => false
var CloseGroupOptions = {
  count: 1
}

/**
 * @remarks `CollectibleSubject` implements `ICollectibleSubject`.
 */
class CollectibleSubject extends Subject {
  constructor(cancel, options = EmptyObject) {
    super(cancel)

    if (options instanceof Function)
      options = { ...CloseGroupOptions, isRelease: options }

    var { 
      count = Count, 
      isAddRef = False, 
      isRelease = False 
    } = options

    assert.ok(count >= 0)

    this.count = count
    this.isAddRef = isAddRef
    this.isRelease = isRelease
  }

  addRef() { 
    this.count++ 
  }
  
  release() {
    this.count--
    assert.ok(this.count >= 0)
  }

  get [IsEligible]() { 
    return !this.count 
  }

  [Next](o) {
    if (this.isAddRef(o)) 
      this.addRef()
    else if (this.isRelease(o)) 
      this.release()
    else 
      super[Next](o)
  }
}

module.exports = CollectibleSubject