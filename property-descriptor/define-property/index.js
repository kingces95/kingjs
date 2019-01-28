var assert = require('assert');

var { 
  ['@kingjs']: {
    propertyDescriptor: {
      defineWith,
      constructProperty: construct,
    }
  }
} = require('./dependencies');

module.exports = defineWith.bind({ 
  construct
});