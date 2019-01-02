'use strict';

var createInterface = require('@kingjs/create-interface');

module.exports = createInterface('IEnumerable', { 
  members: {
    getEnumerator: null
  }
})