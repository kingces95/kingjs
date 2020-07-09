/**
 * @description Create a class that extends another class
 * and invokes an optional body function in the constructor.
 */
function defineClass(name, extension = Object, body = null) {
  class Class extends extension { 
    constructor(...args) {
      super(...args)

      if (body)
        body.call(this, ...args)
    }
  }

  Object.defineProperty(Class, 'name', { 
    configurable: true,
    value: name 
  })

  return Class
}

module.exports = defineClass