var assertThrows = require('.');

var assert = require('assert');

function readmeCondition() {
  var result;
  try { 
    assertThrows(function() { });
  } 
  catch(e) { result = e; }
  
  assert(result == "An assertion failed.");
}
readmeCondition();

function readmeMessage() {
  var result; 

  try {
    assertThrows(
      function() { }, 
      "Expected an exception, but actually passed."
    )   
  } catch(e) {
    result = e;
  }

  assert(result == "Expected an exception, but actually passed.");
}
readmeMessage();