var source = [1,2,3]
console.log(source
  .map(o => '..')
  .map((o, i, a) => a.slice(i).join('/'))
  .reverse()
)

var Map = Symbol()
Array.prototype[Map] = Array.prototype.map
var i = source[Map](x => x + 1)
var j = source
  [Map](x => x + 1)

var { interval } = require('rxjs');
var { take, timeInterval, timeout } = require('rxjs/operators');

const seconds = interval(1000);

seconds.pipe(timeInterval())
  .subscribe(
      value => console.log(value),
      err => console.log(err),
  );

seconds.pipe(timeout(500))
  .subscribe(
      value => console.log(value),
      err => console.log(err),
  );

// NOTE: The values will never be this precise,
// intervals created with `interval` or `setInterval`
// are non-deterministic.

// {value: 0, interval: 1000}
// {value: 1, interval: 1000}
// {value: 2, interval: 1000}