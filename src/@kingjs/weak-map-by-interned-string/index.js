var {
  '@kingjs': {
    '-string': { Intern }
  },
} = module[require('@kingjs-module/dependencies')]()

class WeakMapByInternedString {
  constructor() {
    this.weakMap = new WeakMap()
  }

  get(key) {
    return this.weakMap.get(key[Intern]())
  }

  set(key, value) {
    this.weakMap.set(key[Intern](), value)
    return value
  }
}

module.exports = WeakMapByInternedString