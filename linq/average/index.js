var { 
  ['@kingjs']: {
    IEnumerable,
    reflect: { exportExtension },
    linq: { Aggregate },
  }
} = require('./dependencies');

function defaultSelector(x) {
  return x;
}

function average(selector) {
  if (!selector)
    selector = defaultSelector;

  var result = this[Aggregate]({ 
      count: 0, 
      sum: 0
    }, function(x) { 
      this.count++; 
      this.sum += selector(x);
      return this;
    }
  );

  return result.sum / result.count;
}

exportExtension(module, IEnumerable, average);
