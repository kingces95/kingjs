var {
  ['@kingjs']: {
    propertyDescriptor: {
      lambdize, 
      makeLazy, 
      targetInstanceOf,
    }
  }
} = dependencies('./dependencies');

function initialize(name, target) {

  var hasGet = 'get' in this;
  var hasSet = 'set' in this;

  var isAccessor = hasGet || hasSet;
  var isFunction = this.function;
  var isFuture = this.future;

  var isProcedural = isAccessor || isFunction || isFuture;
  if (!isProcedural) 
    return this;

  lambdize.call(this, name);

  if (this.callback)
    callback.call(this, name, target);

  if (this.extends)
    targetInstanceOf.call(this, name);

  if (this.lazy) 
    makeLazy.call(this, name);

  return this;
}

module.exports = initialize;
