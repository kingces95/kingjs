var assert = require('.')

function readmeCondition() {
  var result;
  try { assert(0 == 1); } 
  catch(e) { result = e; }
  
  assert(result == "An assertion failed.");
}
readmeCondition();

function readmeFail() {
  var result;
  try { assert(); } 
  catch(e) { result = e; }
  
  assert(result == "An assertion failed.");
}
readmeFail();

function readmeMessage() {
  var result; 

  try {
    var expected = 0;
    var actual = 1;
    
    assert(
      actual == expected,
     "Expected '" + expected + "' but actually got '" + actual + "'."
    );
  
  } catch(e) {
    result = e;
  }

  assert(result == "Expected '0' but actually got '1'.");
}
readmeMessage();