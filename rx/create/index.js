var createAsync = require('./create-async');
var createSync = require('./create-sync');

function create() {
  var factory = arguments.length <= 1 ? createSync : createAsync;
  return factory.apply(this, arguments);
}

module.exports = create;