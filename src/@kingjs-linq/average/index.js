var { 
  ['@kingjs']: {
    IEnumerable,
    reflect: { exportExtension },
    linq: { Aggregate },
  }
} = module[require('@kingjs-module/dependencies')]();

function defaultSelector(x) {
  return x;
}

/**
 * @description Returns the average value of a sequence of 
 * numbers projected from elements of a sequence.
 */
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
