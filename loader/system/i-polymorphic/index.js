//'use strict';

var identityId = require('../../runtime/identity');

// declare
function IPolymorphic() {
  throw 'Cannot activate interface.';
}
IPolymorphic.prototype = null;

// add member 'polymorphisms'
IPolymorphic.polymorphisms = Symbol('@kingjs/IPolymorphic.polymorphisms');

// identify
var id = IPolymorphic[identityId] = Symbol('@kingjs/IPolymorphic');

// implement IPolymorphic
var { polymorphisms } = IPolymorphic;
IPolymorphic[polymorphisms] = Object.create(null);
IPolymorphic[polymorphisms][id] = IPolymorphic;


module.exports = IPolymorphic;