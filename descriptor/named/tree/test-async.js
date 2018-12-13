'use strict';

var results = { };

var resolveA;

function* A() {
  while ('B' in results == false)
    yield true;
  results.A = true;
}

function* B() {
  results.B = true;
  return true;
}

var aItr = A();
var bItr = B();

function walk() {
  
}
while (true) {
  var a = aItr.next();
  var b = bItr.next();
}

return;