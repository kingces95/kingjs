var { 
  assert,
  ['@kingjs']: {
    reflect: {
      createSymbol
    },
    rx: {
      Select,
      Where,
      ProxySubject,
      IObserver: { Complete },
      IObservable: { Subscribe }
    },
  }
} = require('./dependencies')

var Count = createSymbol(module, 'count')
var Id = createSymbol(module, 'id')

/**
 * @description A subject factory which is also a subject.
 * 
 * @remarks - Manufactured subjects are immediately subscribed, ref-counted, and indexed by id. 
 * @remarks - Subsequent activations increment the ref-count while releases reduce the ref-count. 
 * @remarks - When the ref-count is zero then the subject is eligible for collection. 
 * @remarks - Collection occurs when the factory observes any event. At that point all manufactured
 * subjects with no references are completed, unsubscribed and released for collection by 
 * javascript garbage collector. 
 **/
class Singletons extends ProxySubject {
  constructor() {
    super(
      undefined,
      o => o
        [Select](() => this.collect())
        [Where]()
    )

    this.referenced = { }
    this.unreferenced = { }
    this.unsubscribe = { }

    this[Subscribe](null, () => {
      assert(!Object.keys(this.referenced).length)
      this.collect()
    })
  }

  collect() {
    var unreferenced = this.unreferenced
    if (!Reflect.ownKeys(unreferenced).length)
      return
    
    for (var id in unreferenced) {
      unreferenced[id][Complete]()
      this.unsubscribe[id]()
      delete this.unsubscribe[id]
    }

    this.unreferenced = { }
    return unreferenced
  }

  get(id) {
    return this.referenced[id] || this.unreferenced[id]
  }

  getOrCreate(id, factory) {

    // try cache
    var subject = this.get(id)

    // activate on cache miss
    if (!subject) {
      this.referenced[id] = subject = factory(id)
      subject[Count] = 0
      subject[Id] = id
      this.unsubscribe[id] = subject[Subscribe]()
    }
    
    // update reference count
    delete this.unreferenced[subject]
    subject[Count]++

    return subject  
  }

  release(subject) {
    assert(subject)
    assert(subject[Count])

    var id = subject[Id]

    subject[Count]--

    if (subject[Count])
      return false

    delete this.referenced[id]
    this.unreferenced[id] = subject
    return true
  }
}

module.exports = Singletons