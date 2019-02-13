var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    linq: {
      Aggregate
    },
    IEnumerable,
  }
} = require('./dependencies');

function count(predicate) {      
  return this[Aggregate](0, function(x) {
    var aggregate = this;

    if (!predicate || predicate(x))
      aggregate++;
    
    return aggregate; 
  });
};

exportExtension(module, IEnumerable, count);