var { assert,
  '@kingjs': {
    IObserver: { Subscribe, Next, Complete, Error },
    IObservable: { Subscribe },
    '-rx-subject': { Subject }
  }
} = module[require('@kingjs-module/dependencies')]()

var Noop = () => null

function create(target = { }) {
  var subject = new Subject(Noop)

  target[Subscribe] = function() { subject[Subscribe](...arguments) }

  return new Proxy(target, {
    get(self, key) {
      var result = Reflect.get(...arguments)
      subject[Next]({ isRead: true, key, value: self[key] })
      return result
    },
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

module.exports = create