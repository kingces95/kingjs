'use strict';

var createInterface = require('@kingjs/create-interface');

module.exports = createInterface('IIterable', { 
  members: {
    getIterator: Symbol.iterator
  }
})