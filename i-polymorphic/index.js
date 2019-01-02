'use strict';

var polymorphisms = require('@kingjs/polymorphisms');
var createInterface = require('@kingjs/create-interface');

module.exports = createInterface('IPolymorphic', { 
  members: {
    polymorphisms: polymorphisms,
  }
})