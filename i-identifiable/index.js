'use strict';

var identityId = require('@kingjs/identity');
var createInterface = require('@kingjs/create-interface');

module.exports = createInterface('IIdentifiable', { 
  members: {
    identity: identityId,
  }
})