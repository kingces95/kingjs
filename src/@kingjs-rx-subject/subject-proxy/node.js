var { assert,
  '@kingjs': {
    IEquatable: { Equal, GetHashcode },
    IObserver: { Subscribe, Next, Complete, Error },
    IObservable: { Subscribe },
    '-reflect': { isPojo },
    '-rx-subject': { Subject, SubjectProxy },
    '-collections': { Dictionary },
  }
} = module[require('@kingjs-module/dependencies')]()

var r = {
  x: null,
  A: {
    y: null,
    B: {
      z: null
    }
  }
}

var R = Dir({
  x: null,
  A: Dir({
    z: null,
    B: Dir({ 
      z: null
    })
  })
})

function create(root, options) {
  var { isLeaf, getChildren } = options

  var leafs = new Dictionary()

  function createInode(handle) {
    if (isLeaf(handle))
      return handle

    return new Proxy(handle, {
      deleteProperty(self, key) {
        var result = Reflect.deleteProperty(...arguments)
        subject[Next]({ isDelete: true, key })
        return result
      },
      set(self, key, value) {
        var result = Reflect.set(...arguments)
        subject[Next]({ [key in self ? 'isUpdate' : 'isCreate']: true, key, value })
        return result
      },
    })  
  }

  return createInode(root)
}

module.exports = create