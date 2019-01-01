//'use strict';

var { createInterface } = require('../../runtime/interface');

module.exports = createInterface('IEnumerable', { 
  members: {
    getEnumerator: null
  }
})