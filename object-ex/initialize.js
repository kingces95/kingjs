//var bind = require('./bind');
var extension = require('./extension');
var external = require('./external');
var future = require('./future');
var lambda = require('./lambda');
//var stub = require('./stub');
var thunk = require('./thunk');

var {
  ['@kingjs']: {
    propertyDescriptor: {
      lambdize, 
      makeLazy, 
      targetInstanceOf, 
      createAlias
    }
  }
} = dependencies('./dependencies');

function initialize(name, target) {

  var hasGet = 'get' in this;
  var hasSet = 'set' in this;

  var isAccessor = hasGet || hasSet;
  var isFunction = this.function;
  var isFuture = this.future;
  var isThunk = this.thunk;

  var isProcedural = isAccessor || isFunction || isFuture || isThunk;
  if (isProcedural) {

    lambdize.call(this, name);

    if (this.thunk)
      thunk.call(this, this.thunk);

    else {
      if (this.extends)
        extension.call(this, name);

      else if (this.external)
        external.call(this, name, target);

      if (this.future) 
        future.call(this, name);
    }
  }
}

module.exports = initialize;
