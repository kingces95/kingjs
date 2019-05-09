require('@kingjs/shim')
var assert = require('assert');
var WindowBy = require('..');
var { Key } = require('@kingjs/rx.i-grouped-observable');
var { Subscribe } = require('@kingjs/rx.i-observable');
var Subject = require('@kingjs/rx.subject');
var of = require('@kingjs/rx.of');
var SelectMany = require('@kingjs/rx.select-many');
var Log = require('@kingjs/rx.log');
var Do = require('@kingjs/rx.do');
var Finalize = require('@kingjs/rx.finalize');

var result = []
var subjectId = 0;

of(0, 1, 2, 3, 4, 5, 6, 7)
  [WindowBy](
    o => Math.floor(o / 3) % 2,
    (value, key) => ({ key, value }),
    (value, key) => {
      var subject = new Subject()
      subject.id = subjectId++
      return subject
    }
  )
  [Do](
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