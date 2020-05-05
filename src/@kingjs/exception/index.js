var { 
  assert,
  '@kingjs': {
    stringEx: { Expand }
  }
} = require('./dependencies')

class Exception extends Error {
  constructor(message, pojo) {
    super()

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, Exception)

    if (!message)
      return
      
    this.message = message[Expand](pojo)

    for (var name in pojo)
      this[name] = pojo[name]
  }
}

module.exports = Exception