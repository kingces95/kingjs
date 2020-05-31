var {
  '@kingjs': {
    IGroupedObservable: { Key },
    '-rx': {
      '-subject': { Subject },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

class GroupedSubject extends Subject {
  constructor(key) {
    super()
    this[Key] = key
  }
}

module.exports = GroupedSubject