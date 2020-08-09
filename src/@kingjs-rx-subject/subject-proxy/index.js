var { assert,
  '@kingjs': {
    IObserver: { Subscribe, Next, Complete, Error },
    IObservable: { Subscribe },
    '-rx-subject': { Subject }
  }
} = module[require('@kingjs-module/dependencies')]()

var Noop = () => null

// function create(target = { }) {
//   return create2(target)
// }

function create(target = { }) {
  var subject = new Subject(Noop)

  target[Next] = function() { subject[Next](...arguments) }
  target[Complete] = function() { subject[Complete](...arguments) }
  target[Error] = function() { subject[Error](...arguments) }
  target[Subscribe] = function() { subject[Subscribe](...arguments) }

  return new Proxy(target, {
    get(target, key) {
      var result = Reflect.get(...arguments)
      target[Next]({ isRead: true, key, value: target[key] })
      return result
    },
    deleteProperty(target, key) {
      var result = Reflect.deleteProperty(...arguments)
      target[Next]({ isDelete: true, key })
      return result
    },
    set(target, key, value) {
      var result = Reflect.set(...arguments)
      target[Next]({ [key in target ? 'isUpdate' : 'isCreate']: true, key, value })
      return result
    },
  })
}

module.exports = create