var assertTheory = require('@kingjs/assert-theory');

assertTheory(function(test, id) {
  //console.log(test);
}, {
  inherited: [ false, true ],
  package: [ false, true ],
  reference: {
    none: 'none',
    name: 'name',
    fullName: 'fullName',
   },
})

require('./readme');