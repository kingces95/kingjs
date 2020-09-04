module.exports = o => {
  var prototype = Reflect.getPrototypeOf(o)
  if (!prototype)
    return false

  var ctor = prototype.constructor
  if (!ctor)
    return false

  return ctor == Object
}