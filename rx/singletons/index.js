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
 * @description A subject which is also a 
 * factory to create, store, and track
 * references to singleton subjects. Any observation
 * will trigger `Complete` on unreferenced subjects and
 * emission of an object containing reclaimed subjects 
 * stored by id.
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

    this[Subscribe](null, () => {
      assert(!Object.keys(this.referenced).length)
      this.collect()
    })
  }

  collect() {
    var unreferenced = this.unreferenced
    if (!Reflect.ownKeys(unreferenced).length)
      return
    
    for (var id in unreferenced)
      unreferenced[id][Complete]()

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