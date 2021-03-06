var { 
  '@kingjs': {
    IEnumerable,
    '-module': { ExportInterfaceExtension },
    '-linq-reduction': { Aggregate },
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
    }, function(a, x) { 
      a.count++; 
      a.sum += selector(x);
      return a;
    }
  );

  return result.sum / result.count;
}

module[ExportInterfaceExtension](IEnumerable, average);
