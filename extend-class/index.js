/**
 * @description Create a class that extends another class
 * and invokes an optional body function in the constructor.
 */

function extendClass(name, extension, body) {
  return eval(`class ${name} extends extension {
    constructor(...args) {
      super(...args)

      if (body)
        body.call(this, ...args)
    }
  } ${name}`)
}

module.exports = extendClass