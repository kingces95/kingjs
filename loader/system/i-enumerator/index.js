//'use strict';

var { createInterface } = require('../../runtime/interface');

module.exports = createInterface('IEnumerator', { 
  members: {
    moveNext: null,
    current: null,
  }
})