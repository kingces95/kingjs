require('@kingjs/shim')
var assert = require('assert');
var WindowBy = require('..');
var { Key } = require('@kingjs/rx.i-grouped-observable');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next, Complete } = require('@kingjs/rx.i-observer');
var Subject = require('@kingjs/rx.subject');
var of = require('@kingjs/rx.of');
var SelectMany = require('@kingjs/rx.select-many');
var Log = require('@kingjs/rx.log');
var Spy = require('@kingjs/rx.spy');
var Finalize = require('@kingjs/rx.finalize');

var result = []
var subjectId = 0;

var subject = new Subject();
var window = subject
  [WindowBy](
    o => Math.floor(o / 3) % 2,
    (key, value) => ({ key, value }),
    key => {
      var subject = new Subject()
      subject.id = subjectId++
      return subject
    }
  )

var test = window
  [Spy](
    o => assert(o[Key] >= 0 && o [Key] < 3)
  )
  [SelectMany](o => o
    [Log]('WINDOW')
    [Finalize](
      () => result.push(o.id)
    )
  )
  [Subscribe](
    o => result.push(o),
    () => assert.deepEqual(result, [ 
      { key: 0, value: 0 }, // 1
      { key: 0, value: 1 }, // 2
      { key: 0, value: 2 }, // 3
      0,                    // complete window
      { key: 1, value: 3 }, // 4
      { key: 1, value: 4 }, // 5
      { key: 1, value: 5 }, // 6
      1,                    // complete window
      { key: 0, value: 6 }, // 7
      { key: 0, value: 7 }, // 8
      2,                    // complete window
    ])
  )

subject[Next](0)
subject[Next](1)
subject[Next](2)
subject[Next](3)
subject[Next](4)
subject[Next](5)
subject[Next](6)
subject[Next](7)

var lastKey
var test = window
  [Subscribe](o => lastKey = o[Key])
assert(lastKey == 0);

subject[Complete]()


// Logs:
// WINDOW { key: 0, value: 0 }
// WINDOW { key: 0, value: 1 }
// WINDOW { key: 0, value: 2 }
// WINDOW COMPLETE
// WINDOW { key: 1, value: 3 }
// WINDOW { key: 1, value: 4 }
// WINDOW { key: 1, value: 5 }
// WINDOW COMPLETE
// WINDOW { key: 0, value: 6 }
// WINDOW { key: 0, value: 7 }
// WINDOW COMPLETE