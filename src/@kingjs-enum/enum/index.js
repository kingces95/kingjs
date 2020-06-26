var {
} = module[require('@kingjs-module/dependencies')]()

class IsFile extends Number {
  constructor(value) {
    super(value)
  }
}

class IsDir extends Number {
  constructor(value) {
    super(value)
  }
}


var n = new IsFile(1)
var d = new IsDir(1)
var h = n == 1
n.foo = 10
var d = n & 1
var f = n.foo
var e = n == 1
var x = n === 1

var ActivationError = 'Cannot activate enums.'

/**
 * @description Enum base type.
 * 
 * */
class Enum {

  constructor() {
    throw ActivationError
  }
}

class Bits {
  constructor(value) {
    this.value = value
  }

  isSet(index) {
    return (this.value & 1 << index) != 0
  }
}

class Mask {
  constructor(value) {
    this.value = value
  }
}

class Value {

}

module.exports = Enum