'use strict';

var createInterface = require('@kingjs/create-interface');

module.exports = createInterface('IEnumerator', { 
  members: {
    moveNext: null,
    current: null,
  }
})