'use strict';

var Odometer = require('./index')

function readme() {
  var odometer = new Odometer(10, 10, 10, 10, 10, 10, 10);
  
  var generator = odometer.getEnumerator();

  var actual = [];
  for (var distance = 0; distance < 11; distance++) {
    generator.moveNext();
    var current = generator.current;
    actual.push(current.reverse());
  }

  var expected = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 9],
    [0, 0, 0, 0, 0, 1, 0],
  ];

  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify(expected);

  if (actualJSON != expectedJSON)
    throw (actualJSON + " != " + expectedJSON);
}
readme();

function theory(odometer, expected) {
  var generator = odometer.getEnumerator();

  var actual = undefined;
  if (generator.moveNext()) {
    actual = [];
    do {
      actual.push(generator.current);
    } while (generator.moveNext())
  }
  
  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify(expected);
  
  if (actualJSON != expectedJSON)
    throw (actualJSON + " != " + expectedJSON);
}
theory(new Odometer());
theory(new Odometer([1]), [[0]]);
theory(new Odometer([2]), [[0], [1]]);
theory(new Odometer([1,1]), [[0,0]]);
theory(new Odometer([1,2]), [[0,0], [0,1]]);
theory(new Odometer([2,2]), [[0,0], [1,0], [0,1], [1,1]]);

// give 'em a good error message
function badTheory(bases, error) {
  try { 
    theory(new Odometer(bases)); 
  } 
  catch(e) {
    if (e != error)
      throw('fail');
  }
}
badTheory([0], 'Odometer: ∃x ∈ bases: x <= 0, bases[0] => 0');
badTheory([-1], 'Odometer: ∃x ∈ bases: x <= 0, bases[0] => -1');
badTheory([1, 0], 'Odometer: ∃x ∈ bases: x <= 0, bases[1] => 0');
badTheory([undefined], 'Odometer: ∃x ∈ bases: x <= 0, bases[0] => undefined');
